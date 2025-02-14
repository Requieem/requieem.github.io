import PageModel from "../Models/PageModel.js";

const resCavernasData =
    new PageModel(
        "Res Cavernas",

        `In Res Cavernas, players travel through infinite procedurally 
        generated caves to defeat hordes of enemies and gather treasures. To do this, 
        they are equipped with spells generated based on their requests through a unique 
        GPT generation pipeline. The project aims to showcase an efficient and streamlined 
        approach to these two major themes, namely Procedural Generation and LLM applications 
        in game development. The project also aims to provide a fluid narrative development, 
        as the social interactions and faction reputations in the game are all GPT-Driven. 
        The game challenges the player with exploring and cleansing the caves through a strategical
        exploration system that relies on a grid-based, you-move-they-move approach. 
        As players move through the generated chambers they will also face hordes of enemies
        equipped with A* based path-finding and various abilities. Finally, a hub 
        provides a haven where players can talk with relevant NPCs, generate new spells and stash their treasures.`,
        [
            "/ResCavernas/title_page.png",
            "/ResCavernas/meshunoptimized.png",
            "/ResCavernas/meshoptimized.png",
            "/ResCavernas/gpt_actor.png",
            "/ResCavernas/cave_gameplay.png"
        ],
        [
            null,
            {
                language: "csharp",
                text:
`public class CaveGenerator()
{
    private void GenerateCave()
    {
        // Remove previously generate nodes from the grid
        m_walkableGrid.Nodes.ExceptWith(m_caveGrid);
        ClearCave(); // Clear all generated data collections
        GenerateNormalizedNoise(); // PASS 0 (Compute Shader Dispatch):
        GreedyTriangleGeneration(); // PASS 1 (Compute Shader Dispatch)
        TriangleMeshing(); // PASS 2 (Engine side Allocations)
        ReleaseBuffers(); // Release used resources
        if (!m_collider)
        {
            m_collider = gameObject.AddComponent<BoxCollider>();
            m_collider.isTrigger = true;
        }
        // Join the new grid nodes with the shared grid structure
        m_walkableGrid.Nodes.AddRange(m_caveGrid);
        // Allocate the mask used to record user interactions
        EnsureChangesMaskExists();
    }
}

public class CaveManager : MonoBehaviour
{
    private void Update()
    {
        if (!m_activationQueue.TryDequeue(out var chunk))
            return;
        chunk.gameObject.SetActive(true);
        chunk.Initialize(m_model);
        m_activeChunks.Add(chunk);
    }
}`,
            },
            {
                language: "hlsl",
                text:
`#pragma kernel GenerateSimplex
#include "./SimplexNoise.compute"

RWStructuredBuffer<float4> elements;
int seed;
int octaves;
float matrix_size;
float noise_scale;
float amplitude;
float frequency;
float lacunarity;
float persistence;
int3 center;

// This function ensures that the values are organized
// In a 3D structure based on XYZ coordinates
static int thread_index(uint x, uint y, uint z) {
    return z * matrix_size * matrix_size + y * matrix_size + x;
}

// implement the kernel function
[numthreads(8, 8, 8)]
void GenerateSimplex (int3 id : SV_DispatchThreadID)
{
    // out of bounds check here simplified for brevity
    if(outOfBounds)
    {
        return;
    }
    
    // Get the position of the current thread
    float3 pos = id - matrix_size / 2;
    float noise_value = 0;
    float local_amplitude = amplitude;
    float local_frequency = frequency;
    
    for(int i = 0; i < octaves; i++)
    {
        // Compute 2D and 3D simplex noise for octave i
        float h = simplex_noise_2d((pos + center).xz * local_frequency * noise_scale, seed);
        float n = simplex_noise((pos + center) * local_frequency * noise_scale, seed);
        // Compute the final noise value for the current octave
        // as a combination of the 2D and 3D noise values
        noise_value += local_amplitude * n * h;
        // Update the local amplitude and frequency for the next octave
        local_amplitude *= persistence;
        local_frequency *= lacunarity;
    }
    
    // Store the noise value in the buffer
    elements[thread_index(id.x, id.y, id.z)] = float4(pos, noise_value);
}`
            },
            {
                language: "csharp",
                text:
`public class GPTActor : SerializedMonoBehaviour
    public async Task<string> SendReply(string userPrompt, Action<string> callback)
    {
        var newMessage = new ChatMessage()
        {
            Role = "user",
            Content = userPrompt
        };
    
        newMessage.Content = [...]; // Prompt Omitted for brevity
        m_messages.Add(newMessage);
    
        var completionResponse = await m_openai.CreateChatCompletion(new CreateChatCompletionRequest()
        {
            Model = "gpt-4o-mini",
            Messages = m_messages
        });
    
        if (completionResponse.Choices != null && completionResponse.Choices.Count > 0)
        {
            var message = completionResponse.Choices[0].Message;
            message.Content = message.Content.Trim();
    
            // Deserialize the response json structure
            var json = JsonConvert.DeserializeObject<Dictionary<string, object>>(message.Content);
            
            m_responses.Add(message.Content);
            callback?.Invoke(message.Content);
            m_messages.Add(message);

            // Checks below are simplified for readability
    
            if (historyLogIsValid)
            {
                // Append new info to the historyLog
                var applicationPath = Application.dataPath;
                var contextPath = applicationPath + GptActor.ContextPath + m_actorDetails.Id;
                var fullPath = contextPath + "/" + GptActor.ContextFileName;
                await System.IO.File.AppendAllLinesAsync(fullPath,
                    new[] { $"{DateTime.UtcNow} - {json["historyLog"] as string}" });
                m_contextPrompt += $"{json["historyLog"] as string}\\n";
            }
    
            // Apply standing updates
            if (isStandingUpdateIsValid)
            {
                m_actorDetails.m_standing += standingUpdate;
            }
    
            if (isFactionUpdateIsValid)
            {
                m_actorDetails.m_faction.StandingUpdate(factionStandingUpdate);
            }
    
            return message.Content;
        }
    
        // Generation failed
        Debug.LogWarning("No text was generated from this prompt.");
        return "I don't have anything to say right now. (Generation failed)";
    }
}

public async Task<GridAction> GenerateAction(string userPrompt)
{
    var passResponses = "";
    var initialTimestamp = DateTime.UtcNow;

    try
    {
        var passResponse0 
            = await ActionPass(userPrompt, _actionPrompt0);
        passResponses += passResponse0.Content + "\\n";
        var passResponse1 
            = await ActionPass(userPrompt, passResponses + _actionPrompt1);
        passResponses += passResponse1.Content + "\\n";
        var passResponse2 
            = await ActionPass(userPrompt, passResponses + _actionPrompt2);
        passResponses += passResponse2.Content + "\\n";
        var passResponse3 
            = await ActionPass(userPrompt, passResponses + _actionPrompt3);
        try {
            var generatedAction 
                = JsonConvert.DeserializeObject<GridAction>(passResponse0.Content);
            var generatedTargets 
                = JsonConvert.DeserializeObject<TargetMatrix>(passResponse1.Content);
            var generatedEffects 
                = JsonConvert.DeserializeObject<EffectSet>(passResponse2.Content);
            var generatedVFXProperties 
                = JsonConvert.DeserializeObject<VFXPropertiesDictionary>(passResponse3.Content);
            m_generatedAction = generatedAction;
            m_generatedAction.InitializeFromDeserializedData(generatedTargets, generatedEffects,
                generatedVFXProperties, generatedVFXProperties);
            
            var timeTaken = DateTime.UtcNow - initialTimestamp;
            Debug.Log($"Action generation SUCCEEDED in {timeTaken.TotalSeconds} seconds.");
            
            if(m_activateGeneratedAction) {
                m_actionBook.ActivateAction(m_generatedAction);
            } else {
                m_actionBook.AddAction(m_generatedAction);
            }
            
            return m_generatedAction;
        } catch (Exception e) {
            m_generatedAction = null;
            var timeTaken = DateTime.UtcNow - initialTimestamp;
            Debug.LogError($"Action generation FAILED at PARSING STEP
            in {timeTaken.TotalSeconds} seconds.");
        }
    } catch (Exception e) {
        m_generatedAction = null;
        var timeTaken = DateTime.UtcNow - initialTimestamp;
        Debug.LogError($"Action generation FAILED at GENERATION STEP
        in {timeTaken.TotalSeconds} seconds.");
    }

    return null;
}`
            },
            {
                language: "csharp",
                text:
`public class PlayerDweller : MonoBehaviour, IDweller
{
    [SerializeField] private DwellerController m_controller;

    private void Start()
    {
        if (!m_controller) TryGetComponent(out m_controller);
        Assert.IsTrue(m_controller, "No DwellerController found!");
    }

    public void OnMove(InputAction.CallbackContext context)
    {
        Assert.IsTrue(m_controller, "No DwellerController found!");
        if (!context.performed) return;
        m_controller.OnMove(context.ReadValue<Vector2>());
        IDweller.OnDwellingStart.Invoke();
        InvokeRepeating("MovementTick",0, m_controller.MovementModel.Time);
    }

    private void MovementTick()
    {
        IDweller.OnDwellingTick.Invoke();
    }

    public void OnStop(InputAction.CallbackContext context)
    {
        Assert.IsTrue(m_controller, "No DwellerController found!");
        if (!context.performed) return;
        m_controller.OnStop();
        IDweller.OnDwellingEnd.Invoke();
        CancelInvoke();
    }

    public void OnLook(InputAction.CallbackContext context)
    {
        Assert.IsTrue(m_controller, "No DwellerController found!");
        if (!context.performed) return;
        m_controller.OnLook(context.ReadValue<float>());
    }
}

public static Path FindAStarPath(this Vector3 start, Vector3Int end, HashSet<Vector3Int> grid, Vector3Int[] neighbouringDirections, float maximumFCost = float.MaxValue)
{
    var startInt = start.Round();
    
    if (startInt == end)
    {
        return new Path(startInt, end, Array.Empty<Vector3Int>(), Array.Empty<Vector3Int>());
    }

    var links = new Dictionary<Vector3Int, Vector3Int>();
    var visited = new HashSet<Vector3Int>();
    var queue = new Queue<Vector3Int>();
    var gCost = new Dictionary<Vector3Int, float>();
    var hCost = new Dictionary<Vector3Int, float>();
    var fCost = new Dictionary<Vector3Int, float>();
    
    gCost[startInt] = 0;
    hCost[startInt] = Vector3Int.Distance(startInt, end);
    fCost[startInt] = hCost[startInt];
    
    if(fCost[startInt] > maximumFCost) 
    return new Path(startInt, end, Array.Empty<Vector3Int>(), Array.Empty<Vector3Int>());
    
    queue.Enqueue(startInt);
    
    while (queue.Count > 0)
    {
        var current = queue.Dequeue();
        visited.Add(current);

        if (current == end)
        {
            var waypoints = new List<Vector3Int>();
            var directions = new List<Vector3Int>();
            while(links.ContainsKey(current) && current != startInt)
            {
                var parent = links[current];
                waypoints.Add(current);
                directions.Add(current - parent);
                current = links[current];
            }

            waypoints.Reverse();
            directions.Reverse();
            return new Path(startInt, end, waypoints.ToArray(), directions.ToArray());
        }

        foreach (var direction in neighbouringDirections)
        {
            var neighbour = current + direction;
            if(direction == Vector3Int.zero) continue;
            if (!grid.Contains(neighbour)) continue;
            
            var tentativeGCost = gCost[current] + Vector3Int.Distance(current, neighbour);
            if (visited.Contains(neighbour) && gCost[neighbour] <= tentativeGCost) continue;
            
            links[neighbour] = current;
            gCost[neighbour] = tentativeGCost;
            hCost[neighbour] = Vector3Int.Distance(neighbour, end);
            fCost[neighbour] = gCost[neighbour] + hCost[neighbour];
            if(fCost[neighbour] > maximumFCost) continue;
            
            if (!queue.Contains(neighbour))
            {
                queue.Enqueue(neighbour);
            }
        }
    }
    
    return new Path(startInt, end, Array.Empty<Vector3Int>(), Array.Empty<Vector3Int>());
}
`
            }
        ],
        [
            `The gameplay allows the player to move through a 3D grid, each move 
            triggering a ”tick” in other entities; these entities usually respond 
            to this tick by moving or executing an action. The objective was to 
            create a strategic experience, encouraging players to plan ahead of 
            the challenges around them. Casting spells, interacting with the environment, 
            and triggering other actions also trigger the same ticking event, effectively 
            implementing the proposed you-move-they-move mechanic. Explore the following 
            sections to find out how this was achieved. Finally, dying or ”recalling” 
            brings the player back to the hub, where they can reconcile with NPCs 
            and stash their treasures, adding a rogue-like flavour to the gameplay loop.`,

            `Procedural generation techniques are leveraged to generate the caves 
            where the game takes place. Thanks to the extensive use of Compute Shaders, 
            cave generation happens efficiently at runtime, allowing for a seamless 
            exploration of the generated world. Additionally, the generated world 
            can also be interacted with in various ways.
            
                • 3D Grid-based exploration of the generated caves
                • Enemies explore and chase the player thanks to A* path-finding
                • Various actions can target and affect specific areas of the generated environment
                • Placement and Removal of individual cave blocks
                • With the help of a simple game-mode tool, portions of the generated caves can be tailored to suit specific design needs (eg. the Hub).
                
            The CaveManager Monobehaviour generates single chunks on demand, utilizing
            a queue-based system to manage and execute sequences of chunk generation 
            incrementally over multiple frames. This design proved to be particularly 
            effective for managing the generation tasks that, when batched, could 
            potentially compromise the application’s main loop execution time.`,

            `As the game progresses, the environment might be affected by various changes. 
            The CaveManager also dispatches these change signals to the correct chunks 
            that trigger a regeneration of the cave and grid. Luckily, the generation 
            is efficient enough that this process is unnoticeable even for players 
            standing within the affected chunk. On the GPU side, the first step
            of the cave generation is the simplex noise evaluation. A compute shader 
            kernel leverages fills a buffer of 4-tuples with relevant data. The data is
            arranged in the buffer using an indexing flattening (or packing) function 
            based on the noise poisition, which is later stored as the x, y and z 
            values of the 4-tuple. Lastly, the w value of the tuple holds the computed 
            fractal noise value. The resulting elements buffer then goes through two 
            other compute shaders that normalize the resulting 
            values to a [0,1] range, which makes them easier to manipulate in the 
            last step of this pipeline, mesh generation. As mentioned before, 
            the aim of this process is three fold. Indeed, in the final pass the 
            generated 4-tuples are used to compute a set of Triangles, a set of UV 
            coordinates, and a set of 3D vectors that represent ”walkable” nodes in 
            the grid. To account for arbitrary modifications of the resulting mesh, 
            a changes buffer holds integer values representing if and how each node 
            has been affected. This value fundamentally represents a block index, 
            instructing the compute shader to replace whatever value was generated 
            with the corresponding block id. A value of -1 removes a block, a value 
            of 0 leaves the block unmodified, and any other value up to the 
            available block count (plus one!) sets the current node as that 
            specific block. With all this information, the meshing algorithm goes
            on to construct cubes using simple neighbour-based occlusion optimizations. 
            This means faces that are occluded by a neighbouring block are not 
            generated and thus not rendered, cutting down vertex count considerably as shown
            (from 15886 to 6106 triangles in this specific case).`,

            `One of the uses of the GPT-LLM is aimed at creating dynamic NPCs that take on different roles and personalities.
            Using gpt-4o-mini, this was achieved thanks to a purposefully engineered prompt that instructs the model to
            respond following a certain definition of the NPCs players can interact with. 
            To prompt GPT some simple web-requests are used, provided by a popular OpenAI-Unity library 
            by Sercan Altundas and integrated in the project within the GPTActor MonoBehaviour. 
            The requests are triggered through user input and asynchronously provide structured 
            responses that are later deserialised using the Json.NET framework. 
            Other than equipping GPTActors with their own personalities, an ”history log” is
            recorded locally in a text file. This file is used as a codex of all previous interactions with a specific character.
            Each character has its own history log, that is sent together with the prompt to ensure consequentiality even
            across sessions distant in time. Indeed, adding a timestamp to this history log even allowed GPTActors to have
            a rough sense of how much time passed since their last interaction with the player! This all contributes to a
            more immersive experience that strongly leverages GPT capabilities. All of this is condensed in the following
            function, that triggers a GPT response based on user input. GPT was also employed to generate gameplay content. 
            From the get-go, players are presented with the possibility of generating new spells that can be used in combat. In the demo, this content generation pipeline is seamlessly integrated within the NPC chatting funcionality, but is developed in such a way that makes it invokable
            from anywhere in the project. Where the dialogues only require a single per-prompt request, generating actions
            is achieved across four sequential generation passes. This fragmented apprach break down per-request token
            count and requests complexity, ensuring the large json structure representing actions is generated correctly and consistently. The four generation passes
            are responsible for generating four distinct sets of data: Descriptive Data, Targets Matrix, Effects Set and VFXProperties. 
            Each pass incrementally provides the next ones with its results, in an effort to ensure the generation of
            a GridAction object that is coherent with the user-supplied prompt. Similarly to dialogue requests, each pass has
            a pertinent control prompt that instruct GPT on the generation requirements. Each of these prompts are loaded
            using Resources.Load<TextAsset>([path]) during the OnEnable call of each GPTActor. As a side note,
            this initialization could be optimized and execute once for all actors; this however would be almost unnoticeable
            in terms of performance for this low-volume use-case so the code is left simpler to avoid unnecessary cluttering.`,

            `On of the core gameplay features sees entities in the game respond to player movement and actions. The Observer
            Pattern was the natural tool of choice. In this implementation of the pattern, an IDweller interface provides
            a static entry-point to the hooks used to achieve the desired interactions. Both the player and the enemies use a 
            DwellerController script to move on the grid; the PlayerDweller wrapper processes user input to trigger character movement, 
            while the AutomatedDweller wrapper relies on an A* implementation to route enemies towards the target. The latter are Observers,
            while there isn’t a single observed object per-se, as various user interactions from different sources can effectively trigger
            a response. For example, the player moving triggers a ”Dweller Tick” and so does the player taking an action or digging
            the cave; the former happens within the PlayerDweller object while the latter happens through a specific GUI interaction.
            Enemies use an implementation of the A* Algorithm to determine which directions they should follow next
            to reach their target destination. This implementation was originally done in C++ for another persoanl project,
            and it got translated and adapted as Unity CSharp code to satisfy this new project’s requirements. A* pathfinding
            is provided as a Vector3 extension method, so that it’s reusable and maintainable being completely uncoupled
            to classes that use it. It takes and end position, a grid, a set of valid directions and a maximum f cost; these
            arguments will be used to compute a valid Path that will be returned when a solution is found. An empty path
            is returned on a null solution. The algorithm works similarly to most A* implementations; a queue structure is
            used to execute a graph search through the grid. Eventually, and if the target is reached, the queue will contain
            a set of positions that we can backtrack on to compose a valid path. For this simple use-case, the built-in vector
            distance function was used as the cost heuristic.`
        ]
    );
export default resCavernasData;