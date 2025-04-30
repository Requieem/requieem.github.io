import React                       from 'react'
import { atomOneLight, CodeBlock } from 'react-code-blocks'

export default function ImplementingCoreGameplayPost () {
  return (
    <div className="prose dark:prose-invert max-w-none px-6 py-10">
      <h1 className="text-center text-xl font-bold mb-5">Implementing Core Gameplay Features</h1>

      <p><strong>Date:</strong> 2025-04-05</p>
      <p><strong>Author:</strong> Marco Farace</p>
      <p><strong>Category:</strong> Multiplayer Gameplay</p>
      <p><strong>Tags:</strong> Unity, Photon Fusion, Tasks, Networking, Interactables</p>

      <hr className="my-8"/>

      <h2 className="post-subtitle">🔗 Synced Interactables</h2>
      <p>
        The <code className="post-code">SyncedInteractable</code> class is the foundation for all interactable elements
        in the world. It derives
        from <code className="post-code">NetworkBehaviour</code> and implements <code
        className="post-code">IInteractable</code>, allowing
        any derived class to share active state and hints across the network. When spawned, hints are hidden and the
        interactable is considered inactive.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`public override void Spawned() {
    base.Spawned();
    m_hint.SetActive(false);
    IsActive = false;
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>
      <p>
        When a hint needs to be shown to a player, it’s done through a Fusion <code
        className="post-code">[Rpc]</code> method that
        updates visibility on all clients:
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`[Rpc(RpcSources.All, RpcTargets.All)]
private void ShowHint_Rpc(bool show) {
    if (m_hint)
        m_hint.SetActive(!IsActive && show);
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">📋 Task-Activity System</h2>
      <p>
        Tasks are defined as <code className="post-code">GameTask</code> assets that hold requirements and behavior.
        Each task defines
        what item is required, which prefab to spawn as the activity, and which traits affect its speed and yield.
        Activities
        are specialized MonoBehaviours inheriting from <code className="post-code">TaskActivity</code> that handle
        gameplay logic.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`[CreateAssetMenu(fileName = "Task", menuName = "Gameplay/Tasks/Task")]
public class GameTask : Identifier {
    [SerializeField] private Item m_requiredItem;
    [SerializeField] private TaskActivity m_activity;
    [SerializeField] private ItemSet m_rewards;
    [SerializeField] private TraitSet m_speedModifiers;
    [SerializeField] private TraitSet m_yieldModifiers;
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>
      <p>
        A good example is <code className="post-code">MiningActivity</code>, a timing-based minigame that spawns
        clickable targets
        with associated countdown timers. If players hit the targets within a valid window, progress increases. Misses
        are tracked and failing to hit in time leads to failure. The activity runs locally but is initiated via an RPC,
        ensuring consistency.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`private void SpawnNewTarget() {
    var target = Instantiate(m_targetPrefab, ...);
    var timer = Instantiate(m_timerPrefab, ...);
    m_targetTimes.Add(target, 0);
    m_targetTimers.Add(target, timer);
    target.SetCallback(() => TargetHit(target));
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">🎮 Equippable Items</h2>
      <p>
        The <code className="post-code">EquippableItem</code> class extends <code
        className="post-code">SyncedInteractable</code> to provide
        full support for pick-up, IK-based attachment, and detachment. Using a Fusion networked rigidbody, physics is
        disabled
        when equipping and re-enabled when the item is dropped or interaction ends. The position is synchronized
        manually in
        <code className="post-code">Attach()</code> and <code className="post-code">AttachIK()</code> loops.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`private IEnumerator Attach() {
    var time = 0f;
    transform.SetParent(AttachPoint, true);
    while (time < m_attachTime) {
        transform.localPosition = Vector3.Lerp(...);
        ...
        yield return null;
    }
    while (enabled && IsActive) {
        transform.localPosition = m_positionOffset;
        m_networkRigidbody.Rigidbody.position = transform.position;
        yield return null;
    }
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">🌐 Networking Details</h2>
      <p>
        Networking consistency is maintained using Fusion’s <code className="post-code">[Networked]</code> properties
        (e.g., <code className="post-code">IsActive</code>) and
        <code className="post-code">[Rpc]</code> calls. Most actions — like interaction, equipping, and hint toggling —
        are mirrored
        across all clients via <code className="post-code">RpcTargets.All</code>. Since Fusion allows physics simulation
        per client,
        item movement is broadcast explicitly for better determinism when parenting items to sockets or rig positions.
      </p>

      <hr className="my-8"/>
      <p>
        These gameplay systems form the backbone of <em>Profit Pits</em>: highly extensible, data-driven, and robust
        under multiplayer constraints. Whether the player is equipping gear or mining interactables, the outcome is
        always network-synced and task-configurable.
      </p>
    </div>
  )
}