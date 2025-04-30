import PageModel           from '../Models/PageModel.js'
import { FaBoltLightning } from 'react-icons/fa6'

const stormFoundersData =
  new PageModel(
    'Storm Founders',

    `Welcome to Storm Founders, an island where the lush landscapes and serene beauty hide a dangerous secret: relentless storms! As the pioneer of a new village, your task is not only to expand and thrive but also to protect your creation from the fury of nature itself.
The island may seem like a paradise, but beware of the frequent thunderstorms that bring an abundance of lightning strikes. Luckily, you have access to a revolutionary new device—the Lightning Rod. Place it strategically to safeguard your village from destruction, but don’t worry about running out of resources. The island is rich in Electrite, a rare material that allows you to build as many Lightning Rods as you need!
Navigate your way across the island, gather resources, and manage your village’s growth—all while defending against the elements. Keep a close eye on consumable levels, and don’t let your resources run low. Storms may come, but with enough strategy and courage, your village can weather anything.`,
    '/StormFounders/title_screen.png',
    <FaBoltLightning className={'fill-text-light h-5 w-5'}/>,
    [
      '/StormFounders/title_screen.png',
      '/StormFounders/start_road.png',
      '/StormFounders/game_crops.png',
      '/StormFounders/game_night.png',
    ],
    [
      {
        language: 'csharp',
        text: `using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;
using DG.Tweening;
using Sirenix.OdinInspector;
using System.Linq;

public class Villager : SerializedMonoBehaviour
{
    public enum VillagerState
    {
        Idle,
        Gathering,
        Depositing,
        MovingToWorkplace,
        MovingToStorage,
        Wandering,
        WaitingForPath,
        WaitingToGather,
        GoingHome,
    }

    [SerializeField] private VillagerState m_state;
    [SerializeField] private VillagerModel m_model;

    [SerializeField] private Tilemap m_roadSystem;
    [SerializeField] private GridRouter m_gridRouter;

    [SerializeField] private VillagerSpawn m_spawner;
    [SerializeField] private MonoBuilding m_home;
    [SerializeField] private MonoBuilding m_workplace;
    [SerializeField] private MonoBuilding m_storagePlace;
    [SerializeField] private MonoBuilding m_currentDestination;
    [SerializeField] private int m_needsDenialPatience;
    [SerializeField] private Dictionary<Resource, int> m_transportedIncome = new();

    private void SetState(VillagerState newState)
    {
        if (newState == VillagerState.Idle)
        {
            Debug.Log("Villager is Idling");
        }

        m_state = newState;
    }
    private void Start()
    {
        SetState(VillagerState.Idle);
        m_needsDenialPatience = m_model.NeedsDenialPatience;
        m_gridRouter.OnPathComplete.AddListener(OnPathComplete);
        m_storagePlace = GameObject.FindGameObjectWithTag("Storage").GetComponent<MonoBuilding>();
        VillagerManager.Instance.RegisterVillager(this);
        StartConsumingNeeds();
    }
    public void SetHome(MonoBuilding home, VillagerSpawn spawner)
    {
        m_home = home;
        m_spawner = spawner;
    }
    public void StartWorking(MonoBuilding workplace)
    {
        m_workplace = workplace;
        SetState(VillagerState.MovingToWorkplace);
        SetDestination(workplace);
    }
    public void StartConsumingNeeds()
    {
        foreach (var entry in m_model.Needs)
        {
            var resource = entry.Key;
            var currentSeason = SeasonManager.Instance.CurrentSeason;
            if (!entry.Value.ContainsKey(currentSeason))
                continue;

            StartCoroutine(ConsumeNeeds(resource, entry.Value));
        }
    }
    private void UnsatisfactionLeave()
    {
        StopAllCoroutines();
        VillagerManager.Instance.RemoveVillager(this);
        m_gridRouter.StopAllCoroutines();
        transform.DOKill();
        m_spawner.StartRespawnTimer(this);
        transform.DOPunchRotation(Vector3.one * 45, 1.5f).OnComplete(() => transform
        .DOScale(Vector3.zero, 0.5f).SetEase(Ease.InBack).OnComplete(() => Destroy(gameObject)));
    }
    public void SetDestination(MonoBuilding destination)
    {
        m_currentDestination = destination;
        var pathing = m_gridRouter.GoThere(destination.gameObject);
        if (!pathing)
        {
            SetState(VillagerState.WaitingForPath);
            StartCoroutine(TryRepath());
        }
        else
        {
            transform.DOScale(Vector3.one, 0.5f);
        }
    }
    public void GoHome()
    {
        SetDestination(m_home);
    }
    private void OnPathComplete()
    {
        if (m_state == VillagerState.GoingHome)
        {
            SetState(VillagerState.Idle);
            transform.DOScale(Vector3.zero, 0.5f);
        }
        else if (m_state == VillagerState.MovingToWorkplace)
        {
            Debug.Log("Villager arrived at workplace");
            SetState(VillagerState.Gathering);
            transform.DOScale(Vector3.zero, 0.5f);
            StartCoroutine(Gather());
        }
        else if (m_state == VillagerState.MovingToStorage)
        {
            SetState(VillagerState.Depositing);
            transform.DOScale(Vector3.zero, 0.5f);
            StartCoroutine(Deposit());
        }
        else if (m_state == VillagerState.Wandering)
        {
            SetState(VillagerState.Idle);
        }
    }
    public void RemoveWorkplace()
    {
        m_workplace = null;
        if (m_state == VillagerState.Gathering && m_transportedIncome.Count > 0 && m_transportedIncome.Any(x => x.Value > 0))
        {
            SetState(VillagerState.MovingToStorage);
            SetDestination(m_storagePlace);
        }
        else
        {
            SetState(VillagerState.GoingHome);
            SetDestination(m_home);
        }
    }

    private IEnumerator Deposit()
    {
        yield return new WaitForSeconds(m_model.DepositTime);
        foreach (var income in m_transportedIncome)
        {
            var _amount = income.Value;
            if (_amount > 0)
            {
                var _resource = income.Key;
                _resource.Gain(_amount, SeasonManager.Instance.CurrentSeason);
            }
        }
        m_transportedIncome.Clear();

        if (m_workplace != null)
        {
            SetState(VillagerState.MovingToWorkplace);
            SetDestination(m_workplace);
        }
        else
        {
            SetState(VillagerState.GoingHome);
            SetDestination(m_home);
        }
    }
    private IEnumerator Gather()
    {
        Debug.Log("Gathering");
        yield return new WaitForSeconds(m_model.GatherTime);
        var isFull = CheckTryGather();

        if (!isFull)
        {
            SetState(VillagerState.WaitingToGather);
            m_workplace.IncomeGenerated.AddListener(TryGather);
        }
        else
        {
            SetState(VillagerState.MovingToStorage);
            SetDestination(m_storagePlace);
        }
    }
    private IEnumerator TryRepath()
    {
        var pathing = m_gridRouter.GoThere(m_currentDestination.gameObject);

        while (m_state == VillagerState.WaitingForPath && !pathing)
        {
            yield return new WaitForSeconds(m_model.RepathTime);
            pathing = m_gridRouter.GoThere(m_currentDestination.gameObject);
        }

        if (m_currentDestination == m_workplace)
            SetState(VillagerState.MovingToWorkplace);
        else if (m_currentDestination == m_storagePlace)
            SetState(VillagerState.MovingToStorage);
        else if (m_currentDestination == m_home)
            SetState(VillagerState.GoingHome);
        transform.DOScale(Vector3.one, 0.5f);
    }
    private IEnumerator ConsumeNeeds(Resource resource, Dictionary<Season, (float interval, int quantity)> needs)
    {
        while (enabled)
        {
            var currentSeason = SeasonManager.Instance.CurrentSeason;
            if (!needs.ContainsKey(currentSeason))
                continue;
            yield return new WaitForSeconds(needs[currentSeason].interval);
            var couldSatisfyNeeds = resource.Spend(needs[currentSeason].quantity);
            if (!couldSatisfyNeeds)
            {
                m_needsDenialPatience--;
                if (m_needsDenialPatience <= 0)
                {
                    UnsatisfactionLeave();
                }
            }
        }
    }

    private void TryGather()
    {
        var isFull = CheckTryGather();

        if (m_state == VillagerState.WaitingToGather && isFull)
        {
            m_workplace.IncomeGenerated.RemoveListener(TryGather);
            SetState(VillagerState.MovingToStorage);
            SetDestination(m_storagePlace);
        }
    }
    private bool CheckTryGather()
    {
        var isFull = true;
        for (int _i = 0; _i < m_workplace.AvailableIncome.Count; _i++)
        {
            var income = m_workplace.AvailableIncome.ElementAt(_i);
            var resource = income.Key;
            var maxStorage = m_model.MaxStorage.ContainsKey(resource) ? m_model.MaxStorage[resource] : 0;
            if (!m_transportedIncome.ContainsKey(resource))
                m_transportedIncome.Add(resource, 0);

            var remainingSpace = Mathf.Max(maxStorage - m_transportedIncome[resource]);
            var availableIncome = Mathf.Min(remainingSpace, income.Value);
            var isResourceFull = availableIncome == remainingSpace;
            isFull &= isResourceFull;
            m_workplace.AvailableIncome[resource] -= availableIncome;
            m_transportedIncome[resource] += availableIncome;
        }
        return isFull;
    }

}`,
      },
      {
        language: 'csharp',
        text:
          `using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.Tilemaps;

public class RoadPlacementSystem : MonoBehaviour, ILockingOperation
{
    [SerializeField] private TileBase m_placeHolderTile;
    [SerializeField] private TileBase m_roadTile;
    [SerializeField] private TileBase m_palizzataTile;
    [SerializeField] private bool m_sketchingRoad;
    [SerializeField] private bool m_isSketchingValid;
    [SerializeField] private Tilemap m_sketchingTilemap;
    [SerializeField] private Tilemap m_sketchingAidTilemap;
    [SerializeField] private Tilemap m_roadTilemap;
    [SerializeField] private Tilemap m_treesTilemap;
    [SerializeField] private List<Vector3Int> m_pathAnchors = new();
    [SerializeField] private List<Vector3Int> m_sketchedPath = new();

    private bool m_buildingRoad;

    public void PlaceRoad()
    {
        if (ILockingOperation.IsLocked)
            return;

        if (m_sketchingRoad)
        {
            ILockingOperation.Unlock();
            m_buildingRoad = false;
            StopSketchingRoad();
        }
        else
        {
            ILockingOperation.Lock();
            m_buildingRoad = true;
            StartSketchingRoad();
        }
    }

    public void StartSketchingRoad()
    {
        m_sketchingRoad = true;
        ClearSketch();
    }

    public void StopSketchingRoad()
    {
        m_sketchingRoad = false;

        foreach (var path in m_sketchedPath)
        {
            m_treesTilemap.SetTile(new Vector3Int(path.x, path.y, 0), null);
            m_roadTilemap.SetTile(new Vector3Int(path.x, path.y, 0), m_roadTile);
            // tile position just below this one
            var below = new Vector3Int(path.x, path.y - 1, 0);
            if (!m_roadTilemap.HasTile(below))
            {
                m_roadTilemap.SetTile(below, m_palizzataTile);
            }
        }

        ClearSketch();
    }

    public void ClearSketch()
    {
        m_pathAnchors ??= new();
        m_sketchedPath ??= new();

        m_sketchingTilemap.ClearAllTiles();
        m_sketchingAidTilemap.ClearAllTiles();
        m_pathAnchors.Clear();
        m_sketchedPath.Clear();
        m_cachedPaths.Clear();
    }

    public void OnMiddleClick(InputAction.CallbackContext context)
    {
        if (!context.performed)
            return;

        if (m_sketchingRoad && m_buildingRoad)
        {
            ILockingOperation.Unlock();
            m_buildingRoad = false;
            StopSketchingRoad();
        }
    }

    public void OnRightClick(InputAction.CallbackContext context)
    {
        if (!context.performed)
            return;

        if (!m_sketchingRoad)
        {
            return;
        }

        if (m_pathAnchors.Count > 0)
        {
            var removedAnchor = m_pathAnchors[^1];
            m_pathAnchors.RemoveAt(m_pathAnchors.Count - 1);

            if (m_cachedPaths.ContainsKey(removedAnchor) && m_cachedPaths[removedAnchor].Count > 0)
            {
                var removedPath = m_cachedPaths[removedAnchor].Last(); ;
                foreach (var path in removedPath)
                {
                    m_sketchingTilemap.SetTile(new Vector3Int(path.x, path.y, 0), null);
                }

                m_cachedPaths[removedAnchor].RemoveAt(m_cachedPaths[removedAnchor].Count - 1);
            }
        }

        if (m_pathAnchors.Count <= 0)
        {
            ClearSketch();
        }

        m_sketchedPath.Clear();

        for (int i = 0; i < m_pathAnchors.Count - 1; i++)
        {
            m_sketchedPath.AddRange(AnchorAStarPath(new Vector2Int(m_pathAnchors[i].x, m_pathAnchors[i].y), new Vector2Int(m_pathAnchors[i + 1].x, m_pathAnchors[i + 1].y)));
        }
    }

    private void OnDrawGizmos()
    {
        if (m_sketchedPath.Count > 0)
        {
            Gizmos.color = Color.blue;
            for (int i = 0; i < m_sketchedPath.Count - 1; i++)
            {
                Gizmos.DrawCube(m_sketchingTilemap.GetCellCenterWorld(m_sketchedPath[i]), Vector3.one * 0.25f);
                Gizmos.DrawLine(m_sketchingTilemap.GetCellCenterWorld(m_sketchedPath[i]), m_sketchingTilemap.GetCellCenterWorld(m_sketchedPath[i + 1]));
            }

            Gizmos.DrawCube(m_sketchingTilemap.GetCellCenterWorld(m_sketchedPath[^1]), Vector3.one * 0.25f);
        }
    }

    private (Vector3Int?, bool) m_lastTile;

    private void Update()
    {
        if (ILockingOperation.IsLocked && !m_buildingRoad)
        {
            return;
        }

        if (!m_sketchingRoad)
        {
            if (m_lastTile.Item1.HasValue)
            {
                if (m_lastTile.Item2 && m_buildingRoad)
                    m_sketchingTilemap.SetTile(m_lastTile.Item1.Value, m_placeHolderTile);
                else
                    m_sketchingTilemap.SetTile(m_lastTile.Item1.Value, null);
            }

            m_lastTile = (null, false);
            return;
        }

        var mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        var gridSnappedPosition = m_sketchingTilemap.WorldToCell(mousePosition);
        var isSame = m_lastTile.Item1 == gridSnappedPosition;

        if (isSame)
            return;

        m_sketchingAidTilemap.ClearAllTiles();
        if (m_lastTile.Item1.HasValue)
        {
            if (m_lastTile.Item2)
                m_sketchingTilemap.SetTile(m_lastTile.Item1.Value, m_placeHolderTile);
            else
                m_sketchingTilemap.SetTile(m_lastTile.Item1.Value, null);
        }

        m_lastTile = (gridSnappedPosition, m_sketchingTilemap.HasTile(gridSnappedPosition));
        m_sketchingTilemap.SetTile(gridSnappedPosition, m_placeHolderTile);

        if (m_pathAnchors.Count <= 0)
            m_isSketchingValid = true;
        else
        {
            // get the normalized direction between the last anchor and m_lastTile.Item1.Value
            var lastAnchor = m_pathAnchors[^1];
            var direction = (m_sketchingTilemap.GetCellCenterWorld(gridSnappedPosition) - m_sketchingTilemap.GetCellCenterWorld(lastAnchor)).normalized;

            // check if the direction is valid (up, down, left, right)
            m_isSketchingValid = direction == Vector3.up || direction == Vector3.down || direction == Vector3.left || direction == Vector3.right;

            if (m_isSketchingValid)
            {
                // place all tiles between the last anchor and m_lastTile.Item1.Value on the m_sketchingAidTilemap
                var path = AnchorAStarPath(new Vector2Int(lastAnchor.x, lastAnchor.y), new Vector2Int(gridSnappedPosition.x, gridSnappedPosition.y));
                foreach (var p in path)
                {
                    m_sketchingAidTilemap.SetTile(new Vector3Int(p.x, p.y, 0), m_placeHolderTile);
                }
            }
        }

    }

    private Dictionary<Vector3Int, List<List<Vector3Int>>> m_cachedPaths = new();
    private Vector3Int m_lastAnchor = new Vector3Int(int.MaxValue, int.MaxValue, 0);

    public void OnLeftClick(InputAction.CallbackContext context)
    {
        if (!context.performed)
            return;

        if (!m_sketchingRoad || !m_isSketchingValid)
        {
            return;
        }

        var mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        var gridSnappedPosition = m_sketchingTilemap.WorldToCell(mousePosition);
        var newAnchor = new Vector2Int(gridSnappedPosition.x, gridSnappedPosition.y);

        if (m_pathAnchors.Count > 0)
        {
            var lastAnchor = new Vector2Int(m_pathAnchors[^1].x, m_pathAnchors[^1].y);
            var newPath = AnchorAStarPath(lastAnchor, newAnchor).ToList();
            newPath.Add(new Vector3Int(newAnchor.x, newAnchor.y, 0));

            newPath = newPath.Where(p => !m_sketchedPath.Contains(p)).ToList();

            foreach (var path in newPath)
            {
                m_sketchingTilemap.SetTile(m_sketchingTilemap.WorldToCell(new Vector3Int(path.x, path.y, 0)), m_placeHolderTile);
            }

            m_sketchedPath.AddRange(newPath);
            var newIntAnchor = new Vector3Int(newAnchor.x, newAnchor.y, 0);

            if (!m_cachedPaths.ContainsKey(newIntAnchor))
            {
                m_cachedPaths.Add(newIntAnchor, new List<List<Vector3Int>>() { newPath });
            }
            else if (m_lastAnchor != newIntAnchor)
            {
                m_cachedPaths[newIntAnchor].Add(newPath);
            }

            m_lastAnchor = newIntAnchor;
        }

        m_pathAnchors.Add(new Vector3Int(newAnchor.x, newAnchor.y, 0));
        m_lastTile = (gridSnappedPosition, true);
    }

    public Vector3Int[] AnchorAStarPath(Vector2Int start, Vector2Int goal)
    {
        return GridHelper.GetAStarPath(start, goal, (pos) => true, GridHelper.GetNeighbours).Select(p => new Vector3Int(p.x, p.y, 0)).ToArray();
    }
}
`,
      },
      {
        language: 'csharp',
        text:
          `using System.Collections.Generic;
using Sirenix.OdinInspector;
using UnityEngine;
using UnityEngine.Events;

[CreateAssetMenu(fileName = "Resource", menuName = "ScriptableObjects/Resource")]
public class Resource : SerializedScriptableObject
{
    [Header("Displayable Data")]
    [SerializeField] private Sprite m_icon;
    [SerializeField] private string m_description;

    [Header("Gameplay Data")]
    [SerializeField] private int m_startingValue;
    [SerializeField] private int m_value;
    [SerializeField] private int m_busy;
    [SerializeField] private int m_max;
    [SerializeField] private int m_income;
    [SerializeField] private bool m_occupyInsteadOfSpending;
    [SerializeField] private Dictionary<Season, int> m_seasonModifiers = new();

    [Header("Events")]
    [SerializeField] private UnityEvent<int> m_onValueChanged;
    [SerializeField] private UnityEvent m_onMaxChanged;
    [SerializeField] private UnityEvent m_onIncomeChanged;
    [SerializeField] private UnityEvent<bool> m_onSpend;
    [SerializeField] private UnityEvent<bool> m_onHaveCheck;

    public UnityEvent<int> OnValueChanged => m_onValueChanged;
    public UnityEvent OnMaxChanged => m_onMaxChanged;
    public UnityEvent OnIncomeChanged => m_onIncomeChanged;
    public UnityEvent<bool> OnSpend => m_onSpend;
    public UnityEvent<bool> OnHaveCheck => m_onHaveCheck;

    public string Name => name;
    public int Value => m_value;
    public int Busy => m_busy;
    public Sprite Icon => m_icon;
    public string Description => m_description;
    public int Max => m_max;
    public int Income => m_income;

    private void OnEnable()
    {
        m_value = m_startingValue;
        m_busy = 0;
        m_onValueChanged.Invoke(m_value);
    }

    public void Gain(int income, Season season, bool flatRate = false)
    {
        if (m_value >= m_max)
        {
            return;
        }

        if (m_seasonModifiers != null && m_seasonModifiers.ContainsKey(season) && !flatRate)
        {
            m_value += income * m_seasonModifiers[season];
        }
        else
        {
            m_value += income;
        }

        m_onValueChanged.Invoke(m_value);
    }

    public void Gain(Season season, bool flatRate = false)
    {
        Gain(m_income, season, flatRate);
    }

    public bool Spend(int amount)
    {
        if (!Has(amount, false))
            return false;

        if (m_occupyInsteadOfSpending)
        {
            m_busy += amount;
        }
        else
        {
            m_value -= amount;
        }

        m_onValueChanged.Invoke(m_value);
        return true;
    }

    public bool Release(int amount)
    {
        var hadAmount = m_busy >= amount;
        amount = Mathf.Min(m_busy, amount);
        m_busy -= amount;
        m_onValueChanged.Invoke(m_value);
        return hadAmount;
    }

    public bool Has(int amount, bool triggerEvent = true)
    {
        var has = m_value - m_busy >= amount;
        if (triggerEvent)
        {
            //m_onHaveCheck.Invoke(has);
        }
        return has;
    }
}`,
      },
      {
        language: 'csharp',
        text:
          `
[CreateAssetMenu(fileName = "Season", menuName = "ScriptableObjects/Season")]
public class Season : ScriptableObject
{
    [SerializeField] private Sprite m_icon;
    [SerializeField] private string m_description;

    public string Name => name;
    public Sprite Icon => m_icon;
}

[CreateAssetMenu(fileName = "SeasonManager", menuName = "ScriptableObjects/SeasonManager")]
public class SeasonManager : ScriptableObject, ITimeResponse
{
    public static SeasonManager Instance { get; private set; }

    [Header("Data")]
    [SerializeField] private int m_currentSeason;
    [SerializeField] private int m_startingSeason;
    [SerializeField] private List<Season> m_seasons;
    [SerializeField] private Season m_fallbackSeason;
    [SerializeField] private int m_currentDay = 0;
    [SerializeField][Range(0, 23)] private int m_startingTime = 8;
    [SerializeField][Range(0, 23)] private int m_startingDay = 0;
    [SerializeField] private float m_timeGainPerSecond = 0.01f;
    [SerializeField] private int m_daysPerSeason = 4;

    [Header("Events")]
    [SerializeField] private UnityEvent<Season> m_onSeasonChanged;

    public Season CurrentSeason => m_seasons != null && m_seasons.Count > m_currentSeason ? m_seasons[m_currentSeason] : m_fallbackSeason;
    public float TimeGainPerSecond => m_timeGainPerSecond;
    public float DayTime => ITimeResponse.DayTime;
    public int CurrentDay => m_currentDay;
    public int DaysPerSeason => m_daysPerSeason;

    public void SetSeason(int seasonIndex)
    {
        var _season = m_seasons != null && m_seasons.Count > seasonIndex ? m_seasons[seasonIndex] : m_fallbackSeason;
        m_currentSeason = seasonIndex;
        SetSeason(_season);
    }

    public void SetSeason(Season season)
    {
        m_onSeasonChanged.Invoke(season);

        foreach (var response in ISeasonResponse.SeasonResponses)
        {
            response.OnSeasonChange(season);
        }
    }

    private void OnEnable()
    {
        if (Instance == null)
        {
            Instance = this;
            ITimeResponse.DayTime = m_startingTime / 24f;
            m_currentDay = m_startingDay;
            OnTimeChange(m_startingTime);
            SetSeason(m_startingSeason);
        }
        else
        {
            if (Application.isPlaying)
            {
                Destroy(this);
            }
            else
            {
                DestroyImmediate(this);
            }
        }
    }

    public void NextSeason()
    {
        var _nextSeason = m_currentSeason + 1;
        if (_nextSeason >= m_seasons.Count)
        {
            _nextSeason = 0;
        }
        SetSeason(_nextSeason);
    }

    public void PreviousSeason()
    {
        var _previousSeason = m_currentSeason - 1;
        if (_previousSeason < 0)
        {
            _previousSeason = m_seasons.Count - 1;
        }
        SetSeason(_previousSeason);
    }

    public void OnTimeChange(float dayCompletion)
    {
        if (dayCompletion >= 1)
        {
            var _nextDay = m_currentDay + 1;
            if (_nextDay >= m_daysPerSeason)
            {
                m_currentDay = 0;
                NextSeason();
            }
            else
            {
                m_currentDay = _nextDay;
            }
        }

        foreach (var response in ITimeResponse.TimeResponses)
        {
            response.OnTimeChange(dayCompletion);
        }
    }
}

public class MonoSeasonManager : SerializedMonoBehaviour
{
    [SerializeField] private SeasonManager m_seasonManager;

    private void Start()
    {
        StartCoroutine(AdvanceTime());
    }

    [Button]
    public void NextSeason()
    {
        m_seasonManager.NextSeason();
    }

    [Button]
    public void PreviousSeason()
    {
        m_seasonManager.PreviousSeason();
    }

    [Button]
    public void SetTime(float time)
    {
        ITimeResponse.DayTime = time;
        m_seasonManager.OnTimeChange(time);
    }

    private IEnumerator AdvanceTime()
    {
        while (true)
        {
            ITimeResponse.DayTime += m_seasonManager.TimeGainPerSecond * Time.deltaTime;
            m_seasonManager.OnTimeChange(ITimeResponse.DayTime);
            ITimeResponse.DayTime %= 1;
            yield return null;
        }
    }
}

[RequireComponent(typeof(Light2D))]
public class SeasonalLight : SerializedMonoBehaviour, ISeasonResponse, ITimeResponse
{
    [Serializable]
    public struct SeasonalLightSettings
    {
        public Color dayColor;
        public Color nightColor;
        public float colorBlendSpeed;
        public float dayIntensity;
        public float nightIntensity;
        public float animationTime;
    }

    [SerializeField] private Light2D light2D;
    [SerializeField] private Dictionary<Season, SeasonalLightSettings> settings = new Dictionary<Season, SeasonalLightSettings>();
    [SerializeField] private SeasonalLightSettings fallBackSettings;

    private SeasonalLightSettings currentSettings;
    private Tween animationTween;
    private Tween colorTween;
    private float Intensity => Mathf.Lerp(currentSettings.nightIntensity, currentSettings.dayIntensity, ITimeResponse.TransformTime());
    private Color Color => Color.Lerp(currentSettings.nightColor, currentSettings.dayColor, ITimeResponse.TransformTime());

    private void OnEnable()
    {
        light2D = GetComponent<Light2D>();
        ITimeResponse.TimeResponses.Add(this);
        ISeasonResponse.SeasonResponses.Add(this);
        var currentSeason = SeasonManager.Instance.CurrentSeason;
        OnSeasonChange(currentSeason);
    }

    private void OnDisable()
    {
        ITimeResponse.TimeResponses.Remove(this);
        ISeasonResponse.SeasonResponses.Remove(this);
    }

    public void OnSeasonChange(Season season)
    {
        if (settings.ContainsKey(season))
        {
            currentSettings = settings[season];
        }
        else
        {
            currentSettings = fallBackSettings;
        }

        AdjustLight();
    }

    private void AdjustLight()
    {
        AnimateColor();
        AnimateLight();
    }

    private void AnimateLight()
    {
        animationTween?.Kill();
        animationTween = DOTween.To(() => light2D.intensity, x => light2D.intensity = x, Intensity, currentSettings.animationTime).SetLoops(-1, LoopType.Yoyo);
    }

    private void AnimateColor()
    {
        colorTween?.Kill();
        colorTween = DOTween.To(() => light2D.color, x => light2D.color = x, Color, currentSettings.colorBlendSpeed);
    }

    public void OnTimeChange(float time)
    {
        AdjustLight();
    }
}`,
      },
    ],
    [
      'The Villager class in this game is the backbone of its automation system, allowing settlements to function dynamically and autonomously. The villagers operate on a state-driven behavior system, where each state—such as Idle, Gathering, Depositing, or MovingToWorkplace—dictates their actions in response to game events. This system follows a structured approach where villagers interact with their environment through pathfinding, resource management, and task execution, all while adhering to a you-move-they-move mechanic that ensures strategic decision-making by the player.\n'
      + 'At its core, the villager automation relies on an AI-driven task'
      + ' management cycle. When assigned a workplace, a villager'
      + ' navigates the game world using grid-based pathfinding facilitated by the GridRouter component. Upon reaching their workplace, they begin a gathering phase, extracting resources over a set period (GatherTime). Once their inventory is full, they deposit their earnings to a storage facility, completing a cycle that keeps the village\'s economy running. If resources become scarce or needs are unmet, villagers can become dissatisfied and ultimately leave the town, which adds a layer of management challenges for the player. This automation seamlessly integrates with the game\'s procedural systems, ensuring villages remain responsive and adaptable to the changing world. Through a combination of compute-efficient coroutines, event-driven interactions, and smooth animations powered by DOTween, the Villager class transforms resource collection into a living, breathing system that enriches the game\'s strategic depth.',

      'The RoadPlacementSystem is a crucial component of the game\'s infrastructure, enabling players to construct a navigable road network that directly influences the efficiency of villager movement. Roads serve as predefined optimal paths for villagers, ensuring they can traverse the environment efficiently while minimizing obstacles. By leveraging grid-based pathfinding, this system dynamically updates the road tilemap, allowing players to plan and expand their village\'s transportation network intuitively.\n'
      + 'I\'ve designed this system around real-time road sketching and'
      + ' placement mechanics so players can sketch the roads before'
      + ' committing to the game world. Players initiate the process by'
      + ' entering sketching mode, where placeholder tiles help to'
      + ' visualize the intended road layout. The system also implements path validation, ensuring that roads align with a logical movement grid—villagers should only travel along valid routes. When a player decides to finalize a road, the terrain updates dynamically, removing obstructions like trees and placing reinforcement structures such as palisades on exposed edges. These roads define paths for villagers and integrate seamlessly with the AI\'s pathfinding system, ensuring that entities—like workers gathering resources or merchants moving between storage and workplaces—navigate the village efficiently. By optimizing routes through A-based path calculations*, the system guarantees that villager automation remains fluid, strategic, and reactive to player-driven changes in the environment.',

      'The resource system plays a pivotal role in the game\'s survival'
      + ' mechanics and is the foundation for villager productivity and'
      + ' the player\'s long-term strategy. Each resource operates in a'
      + ' dynamic economy, where its availability fluctuates based on'
      + ' seasonal modifiers, consumption rates, and passive income'
      + ' generation. Resources are not static; they are gained, spent,'
      + ' and even temporarily occupied depending on the current needs of'
      + ' the village. This creates an ever-changing balance where the'
      + ' player must carefully manage supplies to sustain growth and'
      + ' avoid shortages that could lead to villagers\' dissatisfaction'
      + ' or even abandonment.'
      + 'A key element of this system is its seasonal influence, as'
      + ' resources can be more or less abundant depending on the time of'
      + ' year. The Gain() function applies seasonal modifiers, meaning'
      + ' that stockpiling during times of plenty can be crucial for'
      + ' surviving harsher seasons. Rather than being consumed outright,'
      + ' some resources become "busy," temporarily locked until'
      + ' released—representing ongoing work or reserved supplies that'
      + ' the player cannot access - nor the villagers - until ongoing'
      + ' villager tasks are completed. This layered economy forces the'
      + ' player to plan, adapt to environmental shifts, and ensure the'
      + ' village remains resilient against scarcity. By integrating'
      + ' real-time event-driven updates, the Resource system ensures'
      + ' that the game\'s survival mechanics remain engaging,'
      + ' challenging, and deeply intertwined with the evolving world.',

      'The Season and Time System in Storm Founder introduces a dynamic environmental cycle, shaping the game world and influencing multiple gameplay mechanics. The SeasonManager class governs the passage of time, transitioning between distinct seasons after a set number of in-game days. As time progresses, seasons shift dynamically, triggering changes in resource availability, villager behavior, and environmental conditions. This system aims to provide another layer of strategic depth, requiring players to plan for harsher seasons, where specific resources may become scarce or external threats more aggressive.\n'
      + 'One of this system\'s most visually immersive implementations is'
      + ' Seasonal Lighting, handled by the SeasonalLight component. By'
      + ' leveraging DOTween animations, lighting conditions smoothly'
      + ' adapt to the current season and time of day, shifting between'
      + ' warm, vibrant hues during summer days and cold, dim glow in the'
      + ' depths of winter nights. The system interpolates between'
      + ' predefined day and night light intensities, dynamically'
      + ' adjusting color saturation and brightness as time progresses.'
      + ' Similar features enhance the game\'s aesthetic appeal and serve a'
      + ' functional purpose—for example, during heavy storms, lighting'
      + ' can dim significantly, reducing visibility and creating a more'
      + ' challenging and immersive survival experience. Together, these'
      + ' mechanics create a richly simulated world where the passage of'
      + ' time is not just a visual element but a core gameplay driver'
      + ' that affects exploration, resource management, and the overall'
      + ' survival challenge.',
    ],
    ['Jam', 'AI', 'City Builder'],
  )
export default stormFoundersData