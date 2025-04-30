import React                       from 'react'
import { atomOneLight, CodeBlock } from 'react-code-blocks'

export default function CustomEditorsWithUIToolkitPost (props) {
  return (
    <div className="prose dark:prose-invert max-w-none px-6 py-10">
      <h1 className="text-center text-xl font-bold mb-5">Custom Editors with UIToolkit</h1>

      <p><strong>Date:</strong> 2025-03-20</p>
      <p><strong>Author:</strong> Marco Farace</p>
      <p><strong>Category:</strong> Tooling & Editor Scripting</p>
      <p><strong>Tags:</strong> Unity, UIToolkit, ScriptableObjects, Addressables, Editor</p>

      <hr className="my-8"/>

      <p>
        In our continuing effort to make the <strong>Identifier system</strong> both scalable and designer-friendly,
        we invested in building sleek, high-utility <strong>custom inspectors</strong> using <code
        className="post-code">UIToolkit</code>.
        Rather than rely on the legacy IMGUI system, we leveraged <code className="post-code">UIBuilder</code> and
        <code className="post-code">.uxml</code> trees to define our layout visually and bind it programmatically.
      </p>

      <div className="m-5 w-full rounded-lg overflow-clip">
        <img className={'w-full object-cover'} src="ui_toolkit_item_drawer.png"/>
      </div>

      <h2 className="post-subtitle">📁 A Unified Drawer Architecture</h2>

      <p>
        The foundation of the editor tooling is an inheritance tree centered around:
        <code className="post-code">IdentifierEntryPropertyDrawer&lt;T&gt;</code> and <code
        className="post-code">EntryCollectionPropertyDrawer</code>.
        These abstract classes encapsulate all the rendering and interaction logic for Identifier-based entries.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`public class IdentifierEntryPropertyDrawer<T> : PropertyDrawer where T : Identifier
{
    protected VisualTreeAsset m_visualAsset;
    protected virtual string AssetKey => typeof(T).Name;
    protected virtual string AssetPath => "Assets/Code/UXML/IdentifierEntryDrawer.uxml";
    
    public override VisualElement CreatePropertyGUI(SerializedProperty property)
    {
        if (m_visualAsset == null)
        {
            m_visualAsset = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>(AssetPath);
        }

        // Clone the UXML layout
        VisualElement root = m_visualAsset.CloneTree();

        // Retrieve the child elements
        var icon = root.Q<VisualElement>("icon");
        var description = root.Q<TextField>("description");
        var dropdown = root.Q<DropdownField>("identifier");
        var value = root.Q<FloatField>("value");

        // Get serialized properties
        var identifierProperty = property.FindPropertyRelative("m_identifier");
        var valueProperty = property.FindPropertyRelative("m_value");

        // Bind the value field normally
        value.BindProperty(valueProperty);
        
        if (identifierProperty == null) return root;

        // Load Identifiers via Addressables
        LoadIdentifiers<T>(dropdown, icon, description, identifierProperty, root);

        root.MarkDirtyRepaint();
        return root;
    }
    
    [ ... ]
    
}
  
// Example: TraitEntry drawer binding
[CustomPropertyDrawer(typeof(TraitEntry))]
public class TraitEntryPropertyDrawer : IdentifierEntryPropertyDrawer<Trait> { }`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <p>
        Each drawer automatically renders fields from a .uxml asset, loads all relevant identifiers via <code
        className="post-code">Addressables</code>,
        and applies contextual updates (e.g., show/hide traits, icons, or dropdowns based on selection).
      </p>

      <h2 className="post-subtitle">🎛️ Identifier Selection with Addressables</h2>
      <p>
        One standout QOL feature is that the identifier dropdown dynamically populates based on all available
        addressable
        assets of a given type. This removes hardcoded enums, keeps the system extensible, and allows inspection into
        each identifier's visual metadata at runtime.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`// Dynamically populate a dropdown using Addressables
foreach (var location in locations)
{
    Addressables.LoadAssetAsync<TD>(location).Completed += assetHandle =>
    {
        if (assetHandle.Status == AsyncOperationStatus.Succeeded)
        {
            var identifier = assetHandle.Result;
            if (identifier != null && (predicate?.Invoke(identifier) ?? true))
            {
                availableIdentifiers.Add(identifier);
                // split the camel case identifier name into separate words
                var identifierName = identifier.Name.SplitCase();
                identifierNames.Add(identifierName);
            }
        }

        loadedIdentifiers++;

        // When all identifiers are loaded, update the dropdown
        if (loadedIdentifiers == totalIdentifiers)
        {
            SetupDropdown(dropdown, availableIdentifiers, identifierNames, identifierProperty, icon, description);
        }
    };
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <p>
        Once loaded, icons and descriptions are displayed inline using <code
        className="post-code">StyleBackground</code> and
        <code className="post-code">TextField</code> elements from UIToolkit.
      </p>

      <h2 className="post-subtitle">🧱 Grid-like Collections</h2>
      <div className="m-5 w-full rounded-lg overflow-clip">
        <img className={'w-full object-cover'} src="custom_inspector.png"/>
      </div>
      <p>
        For array-like identifier collections, we built <code className="post-code">EntryCollectionPropertyDrawer</code>,
        which
        renders arrays of <code className="post-code">ItemReward</code>, <code className="post-code">TraitEntry</code>,
        and others in a
        responsive, grid-wrapped layout. Buttons allow adding, reordering, and removing entries visually.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`// Inside EntryCollectionPropertyDrawer.cs
public abstract class EntryCollectionPropertyDrawer : PropertyDrawer
{
    private VisualTreeAsset m_buttonsAsset;
    private VisualTreeAsset m_headerAsset;
    private (SerializedProperty prop, VisualElement element, int index) m_selectedProperty = (null, null, -1);

    protected abstract string EntryName { get; }
    protected abstract string ToggleKey { get; }
    protected abstract string SelectionKey { get; }

    public override VisualElement CreatePropertyGUI(SerializedProperty property)
    {
        if (m_buttonsAsset == null)
        {
            m_buttonsAsset = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>("Assets/Code/UXML/WrapListButtons.uxml");
        }
        
        if (m_headerAsset == null)
        {
            m_headerAsset = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>("Assets/Code/UXML/SectionHeader.uxml");
        }

        var root = new VisualElement();
        var header = m_headerAsset.CloneTree();
        var titleLabel = header.Q<Label>("title");
        var selectedLabel = header.Q<Label>("subtitle");
        var foldoutToggle = header.Q<Toggle>("active-toggle");
        var content = BuildPropertyDrawer(root, selectedLabel, property);
        foldoutToggle.value = EditorPrefs.GetBool(ToggleKey, false);
        content.style.display = foldoutToggle.value ? DisplayStyle.Flex : DisplayStyle.None;
        
        foldoutToggle.RegisterValueChangedCallback((evt) =>
        { 
            EditorPrefs.SetBool(ToggleKey, evt.newValue);
            content.style.display = evt.newValue ? DisplayStyle.Flex : DisplayStyle.None;
            var selectedInt = EditorPrefs.GetInt(SelectionKey, -1);
            selectedLabel.text = evt.newValue && selectedInt != -1 ? $"Selected: {selectedInt}" : $"Show {EntryName}s";
        });
        
        titleLabel.text = property.displayName;
        var selectedInt = EditorPrefs.GetInt(SelectionKey, -1);
        selectedLabel.text = foldoutToggle.value && selectedInt != -1 ? $"Selected: {selectedInt}" : $"Show {EntryName}s";

        root.Add(header);
        root.Add(content);
        
        return root;
    }
    
    [...]

}
`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <p>
        We even preserve selection state across sessions using <code className="post-code">EditorPrefs</code>, and
        highlight
        the selected entry with colored borders.
      </p>

      <h2 className="post-subtitle">🧪 Live Trait Previews</h2>
      <p>
        Some inspectors (like <code className="post-code">ItemEntryPropertyDrawer</code>) feature runtime previews of
        traits.
        These use mini icon strips to show which traits an item grants, pulled directly from the
        <code className="post-code">TraitSet</code> on that item.
      </p>
      <div className="m-5 rounded-lg overflow-clip">
        <CodeBlock
          language="csharp"
          text={`foreach (var traitEntry in item.TraitSet)
{
    var traitIcon = new VisualElement();
    traitIcon.style.backgroundImage = new StyleBackground(traitEntry.Identifier.Icon);
    traitsList.Add(traitIcon);
}`}
          showLineNumbers
          theme={atomOneLight}
        />
      </div>

      <h2 className="post-subtitle">🧼 Result</h2>

      <ul>
        <li>🧠 Identifier sets and traits are editable as grids, not raw serialized lists</li>
        <li>🔍 Identifier metadata is introspectable at edit time</li>
        <li>🎯 Reordering and selection are persistent and user-friendly</li>
        <li>💡 The use of UIBuilder reduces boilerplate and improves consistency</li>
      </ul>

      <p>
        This editor tooling brings our Identifier-based system full circle: flexible for designers, structured for
        programmers,
        and now fully supported by modern Unity editor UI. It’s never been easier to author, inspect, and debug game
        data.
      </p>

      <hr className="my-8"/>
      <p><strong>Next up:</strong> Procedural map generation and content tagging.</p>
    </div>
  )
}