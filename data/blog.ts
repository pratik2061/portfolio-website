export interface BlogList {
  type: "bullet" | "numbered";
  items: string[];
}

export interface BlogSectionData {
  id: string;
  topic?: string;
  heading: string;
  paragraphs: string[];
  list: BlogList | null;
  image: string;
  imageCaption: string;
}

export interface BlogAuthor {
  name: string;
  role?: string;
  profileUrl?: string;
}

export interface BlogRelatedProject {
  title: string;
  description: string;
  demoUrl?: string;
  codeUrl?: string;
}

export interface BlogPostData {
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author?: BlogAuthor;
  relatedProject?: BlogRelatedProject;
  sections: BlogSectionData[];
}

export const BlogData: BlogPostData[] = [
  {
    title: "WebRTC System Engineering: How a Peer-to-Peer Connection Is Built",
    subtitle: "My notes on the complete workflow: ICE, signaling, SDP, and scaling with SFU",
    slug: "webRTC-system-Engineering",
    category: "REAL-TIME MEDIA",
    date: "Nov 08, 2026",
    readTime: "10 min",
    relatedProject: {
      title: "Meet-Up: SFU Video Conferencing Architecture",
      description: "Built with LiveKit SFU, NestJS, React 19, and Redis.",
      demoUrl: "https://meetup.pratiksharma.info.np",
      codeUrl: "https://github.com/pratik2061/meet-up",
    },
    sections: [
      {
        id: "introduction",
        topic: "FOUNDATIONS // 01",
        heading: "Introduction to WebRTC",
        paragraphs: [
          "While working on my project, the authentication layer was completed and the next layer to build was the meeting feature, which runs on WebRTC. Before writing any code, I wanted to understand the whole workflow and system design behind it, so I studied how WebRTC works from the ground up and wrote down what I learned.",
          "WebRTC lets two devices share data directly with each other. That data can be video, audio, screen sharing, files, or chat messages.",
        ],
        list: null,
        image: "",
        imageCaption: "",
      },
      {
        id: "protocol",
        topic: "TRANSPORT LAYER // 02",
        heading: "Protocol: TCP and UDP",
        paragraphs: [
          "WebRTC mainly uses UDP instead of TCP. This choice has clear advantages and one drawback.",
        ],
        list: {
          type: "bullet",
          items: [
            "Advantage: UDP is fast, and no server is needed in the middle for the media. Data travels straight from one device to the other.",
            "Disadvantage: UDP is not reliable. Packets can be missed, which becomes a problem in cases like file sharing.",
            "Chat: Chat messages normally go over TCP, but they can also be sent over UDP.",
          ],
        },
        image: "",
        imageCaption: "",
      },
      {
        id: "public-private-ip",
        topic: "NAT TRAVERSAL // 03",
        heading: "Public IP and Private IP",
        paragraphs: [
          "To understand how two devices find each other, I first looked at how IP addresses work. Every device inside a home or office network has a private IP that is only meaningful inside that network. The router or modem holds the public IP, and all the devices behind it share that one address when they talk to the internet. Anyone on the internet can only reach a device through that public IP.",
          "The catch is that a device does not know its own public IP. This is where the ICE server (STUN/TURN) plays its role. The device sends a request to this server, and the server replies with the public IP address the request came from. Each address discovered this way is called a candidate.",
        ],
        list: null,
        image: "/blog-images/webRTC/public-private-ip.png",
        imageCaption: "Figure 1: Devices in private networks discover their public IP through an ICE server",
      },
      {
        id: "signaling-sdp",
        topic: "SESSION NEGOTIATION // 04",
        heading: "Signaling and SDP",
        paragraphs: [
          "Once both devices know their own public address, they still need to share it with each other. This process of sharing connection details between users or devices is called signaling. For this, I need to set up one socket server (for example, a Node.js server) that both devices connect to.",
          "The information exchanged is called SDP, the Session Description Protocol. It contains all the details of a session, such as my public IP, port, and other connection information. Device A sends its SDP to the server, the server forwards it to Device B, and B sends back its own SDP the same way.",
          "This server is only needed to share the session descriptions with each other. After that, there is no need for the signaling server.",
        ],
        list: null,
        image: "/blog-images/webRTC/signaling-sdp.png",
        imageCaption: "Figure 2: Signaling flow, with SDP exchanged through a socket server",
      },
      {
        id: "connection-steps",
        topic: "LIFECYCLE PIPELINE // 05",
        heading: "WebRTC Connection Build-Up: Steps",
        paragraphs: [],
        list: {
          type: "numbered",
          items: [
            "Find the public IP: The device sends a request to the ICE server (STUN/TURN), which returns the public IP the request came from.",
            "Signaling: Both devices connect to the socket server and exchange SDP, which holds their public IP, port, and session details.",
            "Connection established: After steps 1 and 2, the connection is built. The devices can now share video, audio, screen, files, and messages directly.",
          ],
        },
        image: "",
        imageCaption: "",
      },
      {
        id: "p2p-limitation",
        topic: "SCALING BOTTLENECK // 06",
        heading: "Limitation of Plain P2P",
        paragraphs: [
          "A plain WebRTC connection is peer-to-peer, so it works well for connecting two people. The trouble starts when a third person joins. Every participant would need a separate direct link to every other participant, and the bandwidth and CPU load grow quickly with each new person. With only four peers, I need six links, and each peer has to upload its video three times.",
        ],
        list: null,
        image: "",
        imageCaption: "",
      },
      {
        id: "sfu-architecture",
        topic: "MEDIA SERVER ARCHITECTURE // 07",
        heading: "SFU Architecture",
        paragraphs: [
          "To solve this, apps like Google Meet and Zoom use an SFU (Selective Forwarding Unit). Each participant sends their stream only once to a central server, and the server selectively forwards it to the other participants who need it. This does mean a server is needed, but it behaves like a client: it connects to every participant using the same WebRTC connection. With an SFU, each peer uploads once, no matter how many people are in the meeting.",
        ],
        list: null,
        image: "/blog-images/webRTC/sfu-architecture.png",
        imageCaption: "Figure 3: P2P mesh compared with SFU architecture",
      },
      {
        id: "key-learnings",
        topic: "ENGINEERING RETROSPECTIVE // 08",
        heading: "Key Learnings",
        paragraphs: [],
        list: {
          type: "bullet",
          items: [
            "WebRTC shares video, audio, screen, files, and messages directly between devices, mainly over UDP.",
            "Devices sit behind routers with a public IP, and the ICE server helps a device discover its own.",
            "Signaling with a socket server is only used once, to exchange SDP and introduce the two devices.",
            "Plain P2P suits two people. For meetings with many participants, an SFU is the architecture to use.",
          ],
        },
        image: "",
        imageCaption: "",
      },
    ],
  },
];
