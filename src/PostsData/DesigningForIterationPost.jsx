import React                       from 'react'
import { atomOneLight, CodeBlock } from 'react-code-blocks'

export default function DesigningForIterationPost () {
  return (
    <div className="prose dark:prose-invert max-w-none px-6 py-10">
      <h1 className="text-center text-xl font-bold mb-5">Designing the System for Fast Iteration</h1>

      <p><strong>Date:</strong> 2025-03-06</p>
      <p><strong>Author:</strong> Marco Farace</p>
      <p><strong>Category:</strong> Game Architecture</p>
      <p><strong>Tags:</strong> Unity, ScriptableObjects, Game Design, Photon Fusion</p>

      <hr className="my-8"/>

      <p>
        One of our key goals during the development of <em>Profit Pits</em> was to enable a flexible and fast iteration
        loop
        for gameplay systems — especially those tied to design balancing and progression. To achieve this, we introduced
        a
        robust abstraction: <code className="post-code">Identifier</code>.
      </p>

      <p>
        An <code className="post-code">Identifier</code> is a simple <strong>ScriptableObject</strong> that acts as a
        uniquely addressable design key.
        From <code className="post-code">Item</code> to <code className="post-code">Trait</code> to <code
        className="post-code">GameTask</code>, every high-level mechanic in our systems
        leverages identifiers to stay decoupled, extensible, and inspector-friendly.
      </p>

      <h2 className="post-subtitle">🔑 The Identifier Pattern</h2>
      <p>
        We replaced most hardcoded enums and string keys with ScriptableObject-based identifiers. These not only provide
        strong typing and object-based references, but also allow designers to assign icons, categories, and tooltips
        without touching a single line of code.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`// Abstract Identifier base class
public abstract class Identifier : ScriptableObject
{ 
    [SerializeField] protected Texture2D m_icon;
    [SerializeField] protected string m_description;
    
    public Texture2D Icon => m_icon;
    public string Description => m_description;
    public string Name => name;
}

// Example Trait class
[CreateAssetMenu(fileName = "Trait", menuName = "Gameplay/Trait")]
public class Trait : Identifier { }`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <p>
        This makes it trivial to define new items, traits, or task types. Need a new stat for mining speed? Just
        create a new <code className="post-code">Trait</code> asset and assign it where needed. Defining new identifier
        classes is as simple as inheriting from the base <code>Identifier</code> class, no additional code is needed.
      </p>

      <h2 className="post-subtitle">📦 Entries and Sets</h2>
      <p>
        Identifiers become even more powerful when paired with value containers:
        <code className="post-code">ItemEntry</code>, <code className="post-code">TraitEntry</code>, and
        their respective Set structs (<code className="post-code">ItemSet</code>, <code
        className="post-code">TraitSet</code>).
      </p>

      <p>These container types are:</p>
      <ul>
        <li><strong>Serializable</strong> for inspector editing</li>
        <li><strong>Composable</strong> via overloaded operators</li>
        <li><strong>Network-safe</strong> for use in Fusion or RPC payloads (with the small caveat of having to
          synchronize addressable keys instead of the Identifiers themselves).
        </li>
      </ul>
      <div className="m-5 rounded-lg overflow-clip">

        <CodeBlock
          language="csharp"
          text={`// IIdentifierEntry.cs: generic interface for all identifier entries
public interface IIdentifierEntry<out T> where T : Identifier
{
    public T Identifier { get; }
    public float Value { get; }
}

// TraitSet.cs: Additive composition of TraitEntry : IIdentifierEntry<Trait>
public static TraitSet operator +(TraitSet a, TraitSet b) {
  foreach (var entry in b.m_entries) {
    a[entry.Identifier] += entry.Value;
  }
  return a;
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">⚙️ Plugging Into Systems: Tasks & Activities</h2>

      <p>
        This system isn’t abstract — it’s directly tied into the logic that drives gameplay. For example:
        <code className="post-code">GameTask</code> assets declare which <code
        className="post-code">Item</code> and <code
        className="post-code">ItemType</code> to require or reward, and which <code
        className="post-code">Trait</code>s affect activity speed and yield. These can be configured dynamically in the
        editor.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`// GameTask.cs
    [CreateAssetMenu(fileName = "Task", menuName = "Gameplay/Tasks/Task")]
    public class GameTask : Identifier
    {
        [Header("Requirements")]
        [SerializeField] private Item m_requiredItem;
        [SerializeField] private ItemType m_requiredItemType;
        
        [Header("Activity Prefab")]
        [SerializeField] private TaskActivity m_activity;
        
        [Header("Rewards and Modifiers")]
        [SerializeField] private ItemSet m_rewards;
        [SerializeField] private TraitSet m_speedModifiers;
        [SerializeField] private TraitSet m_yieldModifiers;

        public Item RequiredItem => m_requiredItem;
        public ItemType RequiredItemType => m_requiredItemType;
        public TaskActivity Activity => m_activity;
        public ItemSet Rewards => m_rewards;
        public TraitSet SpeedModifiers => m_speedModifiers;
        public TraitSet YieldModifiers => m_yieldModifiers;
    }`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <p>
        This design makes it easy for designers to tweak values and experiment — tasks are data, not behavior. As an
        additional benefit, composing tasks with TaskActivities allows for multiple versions of the same task to exist.
        Activities
        create a link between the concept of tasks and the actual game mechanics, allowing for a more modular approach
        to gameplay design. A good example of how this system was leveraged is the <code className="post-code">Mining
        Activity</code> class that defines the behaviour a time-based clicking mini-game.
      </p>

      <h2 className="post-subtitle">🧪 First Fusion Integration: Player Movement</h2>

      <p>
        While laying the groundwork for networking via Photon Fusion, we started synchronizing player movement using the
        <code className="post-code">NetworkCharacterController</code> component. This Fusion-provided component, coupled
        with the <code className="post-code">NetworkMecanimAnimator</code>, allows us to
        synchronize player movement and animations across clients with minimal effort. Simply enough, we defined a
        custom component to drive input
        into the controllers, and Fusion takes care of the rest.
      </p>

      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`// PlayerMovement.cs
    public class PlayerMovement : NetworkBehaviour, INetworkRunnerCallbacks
    {
        private static readonly int Speed = Animator.StringToHash("Speed");
        [SerializeField] private Animator m_animator;
        
        private Vector3 m_velocity;
        private Vector2 m_direction;
        private NetworkCharacterController m_netController;

        // creating a instance of the Input Action created
        public override void Spawned()
        {
            if (!TryGetComponent(out m_netController))
                throw new MissingComponentException(
                    "No NetworkCharacterController found. Did you forget to add it from the inspector?");
        }
        
        public override void FixedUpdateNetwork()
        {
            var movementInput = GetInput<CustomInput>();
            if (movementInput.HasValue)
            {
                m_netController.Move(movementInput.Value.Move);
            }
            
            if(m_animator && m_netController)
                m_animator.SetFloat(Speed, m_netController.Velocity.magnitude);
        }
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">✨ Outcome</h2>

      <ul>
        <li>🚀 Designers can create new Traits, Items, Tasks without writing code</li>
        <li>📐 All systems reference shared Identifiers for consistency</li>
        <li>🔄 Runtime systems like Inventory, Activity, and Traits auto-integrate</li>
      </ul>

      <p>
        This architecture creates a powerful loop: designers configure, programmers consume, and iteration cycles stay
        tight and predictable. We're now in a great place to extend these systems and move into procedurally generated
        content
        and multiplayer synced gameplay elements.
      </p>

      <div className="m-5 w-full rounded-lg overflow-clip">
        <img className={'w-full object-cover'} src="identifiers_diagram.png"/>
      </div>

      <hr className="my-8"/>

      <p><strong>Next up:</strong> Creating Custom Editors for Identifiers using UIToolkit.</p>
    </div>
  )
}