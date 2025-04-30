import React from 'react'

export default function ProjectSetupPost () {
  return (

    <div
      className="prose dark:prose-invert prose-pre:!bg-zinc-900 prose-code:before:content-none prose-code:after:content-none max-w-none mx-auto px-6 py-10">
      <h1 className={'w-full text-center text-xl font-bold mb-5'}>Project Setup</h1>

      <p><strong>Date:</strong> 2025-02-23<br/>
        <strong>Author:</strong> Marco Farace<br/>
        <strong>Category:</strong> Multiplayer Game Development<br/>
        <strong>Tags:</strong> Unity 6, Photon Fusion 2, Hathora, SDK Integration</p>

      <hr className="my-8"/>

      <p>
        As the development of <em>Profit Pits</em> kicked off, one of the most crucial early steps was establishing a
        clean
        and scalable multiplayer project architecture. Working alongside my colleague <strong>Raghav
        Suriyashekar</strong>,
        we focused on setting up a new <strong>Unity 6</strong> project and integrating two critical backend services:
        <strong> Photon Fusion 2</strong> for real-time multiplayer networking, and <strong>Hathora</strong> for
        cloud-based
        server orchestration.
      </p>

      <p>
        The goal of this initial phase was to prepare a seamless multiplayer foundation so that future gameplay systems
        —
        from stamina tracking to collaborative mining — could be built without having to rework core networking logic.
      </p>

      <hr className="my-8"/>

      <h2 className={'post-subtitle'}>🔧 Unity 6 Project Initialization</h2>

      <p>We began by creating a clean Unity 6 (6000.0.34f) URP project. Key early decisions included:</p>
      <ul>
        <li>Enabling <strong>Assembly Definition Files (asmdef)</strong> for server-client build modularity.</li>
        <li>Targeting <strong>.NET Standard 2.1</strong> for compatibility with Photon and Hathora SDKs.</li>
        <li>Configuring Unity’s <strong>input system</strong>, <strong>platform targets</strong>, and <strong>physics
          settings</strong> for network determinism.
        </li>
      </ul>

      <p>Folder structure followed standard conventions:</p>
      <pre><code className={'post-code'}>/Assets
  /Code
  /Developers
  /Design
  /Art
  /Audio</code></pre>

      <p>We also immediately set up version control using Git and <code
        className={'post-code'}>.gitignore</code> templates from <a
        href="https://github.com/github/gitignore/blob/main/Unity.gitignore" target="_blank" rel="noopener noreferrer">Github's
        Unity Gitignore</a>.</p>

      <hr className="my-8"/>

      <h2 className={'post-subtitle'}>🔌 Photon Fusion 2 Integration</h2>

      <p>Photon Fusion is our core multiplayer framework — it provides deterministic and event-based networking with
        both <em>hosted</em> and <strong>dedicated server</strong> modes. We chose the <strong>Fusion v2 SDK</strong>,
        which recently exited beta and is fully compatible with Unity 6.</p>

      <h3>Steps Taken:</h3>
      <ol>
        <li>
          <strong>Install Fusion 2:</strong> <br/>
          We installed the Fusion 2 SDK after downloading it from the <a
          href="https://doc.photonengine.com/fusion/current/getting-started/sdk-download" target="_blank"
          rel="noopener noreferrer">Photon Engine website</a>.
        </li>
        <li>
          <strong>Photon App Settings:</strong><br/>
          Photon requires an App ID (from <a href="https://dashboard.photonengine.com/en-US/Fusion/" target="_blank"
                                             rel="noopener noreferrer">dashboard.photonengine.com</a>). We created a new
          Fusion App and copied the App ID
          into <code
          className={'post-code'}>Assets/Addons/Network/Photon/Fusion/Resources/PhotonAppSettings.asset</code>.
        </li>
        <li>
          <strong>Set up simple test scene with <code className={'post-code'}>NetworkRunner</code>:</strong><br/>
          A <code className={'post-code'}>NetworkRunner</code> prefab was added to the scene with a <code
          className={'post-code'}>NetworkSceneManagerDefault</code>. We
          validated the following modes:
          <ul>
            <li>Shared Client (client/host)</li>
            <li>Server (headless)</li>
          </ul>
        </li>
      </ol>

      <p><em>📖 Reference:</em> <a href="https://doc.photonengine.com/en-us/fusion/current/getting-started/overview"
                                  target="_blank" rel="noopener noreferrer">Photon Fusion 2 Docs - Getting Started</a>
      </p>

      <hr className="my-8"/>

      <h2 className={'post-subtitle'}>☁️ Hathora Integration</h2>

      <p>Photon handles networking logic, but we needed <strong>dedicated game server orchestration</strong> for
        scalability and persistence — this is where <strong>Hathora</strong> came in.</p>

      <p>Hathora provides game server provisioning, auto-scaling, and match discovery via a streamlined Unity SDK.</p>

      <h3>Steps Taken:</h3>
      <ol>
        <li>
          <strong>Install Hathora Unity Plugin:</strong><br/>
          We installed the Hathora Unity Plugin from the <a href="https://github.com/hathora/unity-plugin"
                                                            target="_blank" rel="noopener noreferrer">Hathora Unity
          Plugin GitHub Repo</a>.
        </li>
        <li>
          <strong>Create Hathora App:</strong><br/>
          We created a new Hathora app through the <a href="https://console.hathora.dev/application/create"
                                                      target="_blank" rel="noopener noreferrer">Hathora
          Dashboard</a> and copied the <code className={'post-code'}>HathoraAppId</code> into the HathoraServerConfig
          and HathoraClientConfig
          files.
        </li>
        <li>
          <strong>Bridge Photon with Hathora Runtime:</strong><br/>
          We used integration samples from their <a
          href="https://raw.githubusercontent.com/hathora/unity-plugin/main/UnityPackage/Hathora_Cloud_Unity_plugin_latest.unitypackage"
          target="_blank" rel="noopener noreferrer">Sample Project</a>.
        </li>
      </ol>

      <p><em>📖 Reference:</em> <a href="https://hathora.dev/docs/engines/unity/" target="_blank"
                                  rel="noopener noreferrer">Hathora Unity Plugin Docs</a></p>

      <hr className="my-8"/>

      <h2 className={'post-subtitle'}>🧪 Testing the Setup</h2>

      <p>We verified integration by building the server (headless Linux) and client (Mac/Windows) targets. In a local
        LAN and simulated cloud setup:</p>

      <ul>
        <li>Clients could discover and connect to servers via Hathora</li>
        <li>Players spawned consistently using Photon’s state replication</li>
        <li>Host migration was disabled to enforce server authority</li>
      </ul>

      <hr className="my-8"/>

      <h2 className={'post-subtitle'}>🚧 Lessons & Tips</h2>

      <ul>
        <li><strong>Photon and Hathora coexist well</strong>, but require clear <strong>role separation</strong>: Photon
          handles gameplay state, Hathora handles infrastructure.
        </li>
        <li>Automate room creation and connection logic early — users shouldn’t have to manually copy IDs or IPs.</li>
      </ul>

      <hr className="my-8"/>

      <h2 className={'post-subtitle'}>✅ Summary</h2>

      <p>Setting up a multiplayer stack combining <strong>Photon Fusion 2</strong> and <strong>Hathora</strong> provided
        us with a scalable, performant networking backend for <em>Profit Pits</em>. While integration required careful
        alignment of APIs and roles, this foundation ensures we can now build complex gameplay systems with confidence.
      </p>

      <p>Next steps include player state replication and dynamic gameplay content syncing across clients.</p>

      <hr className="my-8"/>

      <p><strong>Stay tuned for more dev logs as we build out <em>Profit Pits</em>!</strong></p>
    </div>
  )
}
