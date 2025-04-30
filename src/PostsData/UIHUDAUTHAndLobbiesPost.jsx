import React                       from 'react'
import { atomOneLight, CodeBlock } from 'react-code-blocks'

export default function UIHudAuthenticationLobbiesPost () {
  return (
    <div className="prose dark:prose-invert max-w-none px-6 py-10">
      <h1 className="text-center text-xl font-bold mb-5">UI, HUD, Authentication and Lobbies</h1>

      <p><strong>Date:</strong> 2025-05-01</p>
      <p><strong>Author:</strong> Marco Farace</p>
      <p><strong>Category:</strong> User Interface</p>
      <p><strong>Tags:</strong> Unity, Firebase, Hathora, Fusion, Lobbies, UI Toolkit</p>

      <hr className="my-8"/>

      <p>
        This article explores the structure and implementation of the UI, authentication, and lobby systems within <em>Profit
        Pits</em>.
        Building upon the official Hathora + Photon Fusion sample menus, we adapted and extended them to meet our needs
        — including
        Firebase Authentication, dynamic lobby browsing, and a custom form-driven UI system. This overhaul aimed to
        improve UX consistency
        and empower flexible navigation between game states.
      </p>

      <h2 className="post-subtitle">🔐 Firebase Authentication & Custom Form System</h2>
      <p>
        The authentication layer uses Firebase under the hood, but its UI is powered by a modular system of form fields
        and states.
        Form rendering is handled by the combination of <code className="post-code">FormState</code>, <code
        className="post-code">FormFields</code>, and
        <code className="post-code">FieldEntry</code> — all configured through serialized mappings in <code
        className="post-code">StateEntries</code>.
        This enables dynamic rendering and toggling of elements when switching between login and signup modes. For
        example, the
        <code className="post-code">FoldableLayoutElement</code> is used to collapse UI groups cleanly when not in use.
      </p>

      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`[Serializable]
public struct FieldEntry
{
    [SerializeField] private FormFields m_field;
    [SerializeField] private FoldableLayoutElement m_element;

    public FormFields Field => m_field;
    public FoldableLayoutElement Element => m_element;

    public static implicit operator KeyValuePair<FormFields, FoldableLayoutElement>(FieldEntry entry)
    {
        return new KeyValuePair<FormFields, FoldableLayoutElement>(entry.Field, entry.Element);
    }
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <p>
        Input fields such as username, email, and password are wrapped in <code
        className={'post-code'}>TextInputEntry</code> instances, which are then
        managed
        through <code className={'post-code'}>TextInputEntries</code> to centralize lookup and value parsing. Password
        fields also support masking and
        toggling,
        thanks to the <code className={'post-code'}>PasswordField</code> component. All inputs flow through the
        <code className={'post-code'}>UserForm</code> controller, which handles
        validation and
        triggers Firebase login/signup requests.
      </p>

      <h2 className="post-subtitle">🧭 Main Menu Navigation</h2>
      <p>
        The main menu is orchestrated through <code className={'post-code'}>MainMenuController</code> and
        <code className={'post-code'}>MenuController</code>, both of which use serialized
        UnityEvents and references to menu sections. The UI groups are toggled using the <code
        className={'post-code'}>CanvasGroup</code> alpha and
        interaction states,
        enabling smooth visual transitions between multiplayer, settings, and authentication sections. These transitions
        are coordinated in the startup methods (<code className={'post-code'}>AwakeUser</code>, <code
        className={'post-code'}>InitUser</code>, <code className={'post-code'}>ShowUser</code>) and bound to UnityEvents
        for
        modularity.
      </p>

      <h2 className="post-subtitle">📋 Lobby Discovery and Room Management</h2>
      <p>
        The multiplayer experience revolves around lobby creation, browsing, and joining. The custom <code
        className={'post-code'}>LobbyEntry</code>prefab
        visualizes
        each available room with host information and current player count. On selection, it passes session data to the
        party
        menu via the PhotonMenuUIParty <code className={'post-code'}>OnJoinButtonPressed(string lobbyId)</code>and
        updates the session ID input.
      </p>

      <p>
        Room availability is fetched from Hathora's <code
        className={'post-code'}>GetActivePublicLobbiesAsync</code>, and the resulting rooms are shown in a dynamic list.
        This process also includes
        DNS resolution and IP mapping
        through
        <code className={'post-code'}>HathoraClientMgr.Instance.ResolveIPAddressAsync</code>, enabling one-click
        connections for public lobbies.
      </p>

      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`/// <summary>
/// The connect method to handle create and join.
/// Internally the region request is awaited.
/// </summary>
/// <param name="creating">Create or join</param>
/// <param name="lobbyId">An optional</param>
/// <returns></returns>
protected virtual async Task ConnectAsync(bool creating, string lobbyId = null)
{
    // Test for input errors before switching screen
    var inputRegionCode = lobbyId.IsNullOrEmpty() ? _sessionCodeField.text.ToUpper() : lobbyId;
    if (creating == false && Config.CodeGenerator.IsValid(inputRegionCode) == false)
    {
        await Controller.PopupAsync(
            $"The session code '{inputRegionCode}' is not a valid session code. Please enter {Config.CodeGenerator.Length} characters or digits.",
            "Invalid Session Code");
        return;
    }

    if (_regionRequest.IsCompleted == false)
    {
        // Goto loading screen
        Controller.Show<PhotonMenuUILoading>();
        Controller.Get<PhotonMenuUILoading>().SetStatusText("Fetching Regions");

        await _regionRequest;
    }

    if (_regionRequest.IsCompletedSuccessfully == false && _regionRequest.Result.Count == 0)
    {
        await Controller.PopupAsync($"Failed to request regions.", "Connection Failed");
        Controller.Show<PhotonMenuUIMain>();
        return;
    }

    if (creating)
    {
        var regionIndex = -1;
        if (string.IsNullOrEmpty(ConnectionArgs.PreferredRegion))
        {
            // Select a best region now
            regionIndex = FindBestAvailableOnlineRegionIndex(_regionRequest.Result);
        }
        else
        {
            regionIndex = _regionRequest.Result.FindIndex(r => r.Code == ConnectionArgs.PreferredRegion);
        }

        if (regionIndex == -1)
        {
            await Controller.PopupAsync($"Selected region is not available.", "Connection Failed");
            Controller.Show<PhotonMenuUIMain>();
            return;
        }

        if (!int.TryParse(_maxPlayersField.text, out var maxPlayers) || maxPlayers <= 0)
        {
            await Controller.PopupAsync($"Invalid max players '{_maxPlayersField.text}'.",
                "Invalid Max Players");
            return;
        }

        ConnectionArgs.Session = Config.CodeGenerator.EncodeRegion(Config.CodeGenerator.Create(), regionIndex);
        ConnectionArgs.Region = _regionRequest.Result[regionIndex].Code;
        ConnectionArgs.MaxPlayerCount = Math.Clamp(maxPlayers, 1, Config.MaxPlayerCount);
        ConnectionArgs.LobbyName = _lobbyNameField.text;
    }
    else
    {
        var regionIndex = Config.CodeGenerator.DecodeRegion(inputRegionCode);
        if (regionIndex < 0 || regionIndex > Config.AvailableRegions.Count)
        {
            await Controller.PopupAsync(
                $"The session code '{inputRegionCode}' is not a valid session code (cannot decode the region).",
                "Invalid Session Code");
            return;
        }

        ConnectionArgs.Session = lobbyId.IsNullOrEmpty() ? _sessionCodeField.text.ToUpper() : lobbyId;
        ConnectionArgs.Region = Config.AvailableRegions[regionIndex];
    }

    ConnectionArgs.Creating = creating;

    BeforeConnectUser();

    Controller.Show<PhotonMenuUILoading>();

    var result = new ConnectResult { Success = true };
    if (OnBeforeConnection != null)
    {
        result = await OnBeforeConnection.Invoke(ConnectionArgs);
    }

    if (result.Success)
    {
        result = await Connection.ConnectAsync(ConnectionArgs);
    }

    if (result.CustomResultHandling == false)
    {
        if (result.Success)
        {
            Controller.Show<PhotonMenuUIGameplay>();
            _onGameStarted.Invoke();
        }
        else
        {
            var popup = Controller.PopupAsync(result.DebugMessage, "Connection Failed");
            if (result.WaitForCleanup != null)
            {
                await Task.WhenAll(result.WaitForCleanup, popup);
            }
            else
            {
                await popup;
            }

            Controller.Show<PhotonMenuUIMain>();
        }
    }
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">🎮 In-Game HUD & Transition</h2>
      <p>
        Once a game session starts, the <code className={'post-code'}>MenuUI</code> hides UI panels and locks the mouse
        cursor. The <code className={'post-code'}>MenuController</code> connects this
        to game state and triggers loading transitions. HUD components like <code
        className={'post-code'}>SteppedFillBar</code> show dynamic stamina or
        cooldown values.
        This component animates toward a soft cap and hard max using coroutine-based interpolation and editor-debuggable
        previews.
      </p>

      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`private IEnumerator AdjustBarsCoroutine(float currentFill, float softCapFill, float maxFill)
{
    var time = 0f;

    var startCurrentWidth = m_currentFill.minWidth;
    var startSoftCapWidth = m_softCapFill.minWidth;
    var startMaxWidth = m_maxFill.minWidth;

    var targetCurrentWidth = m_rectWidth * currentFill;
    var targetSoftCapWidth = m_rectWidth * softCapFill;
    var targetMaxWidth = m_rectWidth * maxFill;

    var startCurrentValue = m_previousValue;
    var startSoftCapValue = m_previousSoftCap;
    var startMaxValue = m_previousMax;
    
    var targetCurrentValue = m_value;
    var targetSoftCapValue = m_softCap;
    var targetMaxValue = m_max;

    while (time < m_animationDuration)
    {
        time += Time.deltaTime;
        var t = Mathf.Clamp01(time / m_animationDuration);

        m_currentFill.minWidth = Mathf.Lerp(startCurrentWidth, targetCurrentWidth, t);
        m_softCapFill.minWidth = Mathf.Lerp(startSoftCapWidth, targetSoftCapWidth, t);
        m_maxFill.minWidth = Mathf.Lerp(startMaxWidth, targetMaxWidth, t);

        var lerpedCurrentValue = Mathf.Lerp(startCurrentValue, targetCurrentValue, t);
        var lerpedMaxValue = Mathf.Lerp(startSoftCapValue, targetSoftCapValue, t);

        m_text.text = $"{Mathf.RoundToInt(lerpedCurrentValue)}/{Mathf.RoundToInt(lerpedMaxValue)}";
        yield return null;
    }

    // Snap final
    m_currentFill.minWidth = targetCurrentWidth;
    m_softCapFill.minWidth = targetSoftCapWidth;
    m_maxFill.minWidth = targetMaxWidth;
    m_text.text = $"{Mathf.RoundToInt(m_value)}/{Mathf.RoundToInt(m_softCap)}";
    m_adjustCoroutine = null;
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">🌐 Networking Aspects</h2>
      <p>
        Every session is started via <code className={'post-code'}>PhotonMenuUIMain</code> or <code
        className={'post-code'}>PhotonMenuUIMain</code> <code className={'post-code'}>ConnectAsync()</code> which
        bridges
        user-entered room codes or lobby
        clicks
        to actual Fusion sessions. The system ensures session validity using <code
        className={'post-code'}>CodeGenerator.IsValid()</code> and region
        checks, then
        initializes a <code className={'post-code'}>FusionBootstrap</code> runner for the correct game mode. The
        resolved
        lobby connection info (IP, port)
        is used
        to start clients directly via Fusion's networking layer. This makes the UI and matchmaking flow tightly
        integrated with
        backend orchestration and gameplay networking.
      </p>

      <p>
        The username set via the Firebase user profile is stored locally and propagated through Photon Fusion player
        state on session
        join, enabling proper identity persistence across UI, networking, and gameplay logic.
      </p>

      <hr className="my-8"/>
      <p>
        This modular UI system unifies login, matchmaking, and in-game HUDs under a consistent data-driven architecture.
        With extensible
        components, animated interactions, and robust Fusion/Hathora networking, it enables a seamless multiplayer
        onboarding and play experience.
      </p>
    </div>
  )
}