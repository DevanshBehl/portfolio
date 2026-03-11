export interface Project {
    id: string;
    title: string;
    description: string;
    extendedDescription: string;
    techStack: string[];
    github: string;
    demo: string;
    features: string[];
    architecture?: string;
}

export const projects: Project[] = [
    {
        id: 'lamda-analytics',
        title: 'LAMDA Analytics',
        description:
            'AI Industrial Analytics Platform — Winner, Creonix ’25 (Nokia). Backend API developer in 4-member team building real-time dashboards. Developed ingestion APIs processing 10k+ events/hour with indexed MongoDB storage. Optimized query performance by 35% via schema design and aggregation tuning. Integrated FastAPI ML inference + MapboxGL geospatial heatmaps with live WebSocket streaming.',
        extendedDescription: 'LAMDA Analytics is a comprehensive conceptual platform designed for industrial environments to monitor, analyze, and visualize data in real-time. Built specifically to handle high-throughput event streams, it leverages a robust backend architecture spanning MongoDB and FastAPI to deliver immediate insights into operational metrics.',
        features: [
            'Real-time ingestion of 10k+ events/hour',
            'Optimized MongoDB aggregations (35% performance increase)',
            'Live MapboxGL geospatial heatmaps',
            'WebSocket streaming for real-time dashboard updates',
            'FastAPI integration for ML inference'
        ],
        architecture: 'The system uses Node.js for high-concurrency ingestion and WebSocket management, pushing data into an indexed MongoDB cluster. FastAPI handlers process background ML inferences, feeding analyzed data back into the real-time stream via Redis Pub/Sub channels.',
        techStack: ['Next.js', 'Tailwind', 'MapboxGL', 'Node.js', 'FastAPI', 'MongoDB', 'Redis'],
        github: 'https://github.com/DevanshBehl',
        demo: '#',
    },
    {
        id: 'codenexus',
        title: 'CodeNexus',
        description:
            'Real-Time Technical Interview Platform with a Distributed Coding Environment. Built multi-language IDE with Docker-isolated execution enforcing CPU, memory, and time constraints. Architected horizontally scalable execution workers using AWS Auto Scaling Groups (ASG) for dynamic load handling. Implemented WebSocket streaming with Redis Pub/Sub for socket scaling and P2P WebRTC video conferencing.',
        extendedDescription: 'CodeNexus bridges the gap in technical interviewing by providing a synchronized, real-time code editor paired with a secure execution environment. It uses containerization to safely execute untrusted user code across multiple languages, ensuring constraints are strictly met to simulate realistic interview constraints while ensuring host system stability.',
        features: [
            'Docker-isolated code execution environments',
            'CPU, memory, and execution time constraints',
            'WebRTC Peer-to-Peer video conferencing',
            'Scalable execution workers using AWS ASG',
            'Real-time collaborative code editing via WebSockets'
        ],
        architecture: 'The backend orchestrates ephemeral Docker containers using a dynamic worker pool. A Redis Pub/Sub backplane scales WebSocket connections across multiple Node.js instances, while WebRTC handles low-latency video and audio streams directly between peers to minimize server bandwidth.',
        techStack: ['WebRTC', 'WebSocket', 'Docker', 'Redis', 'AWS ASG', 'Node.js', 'React'],
        github: 'https://github.com/DevanshBehl',
        demo: '#',
    },
    {
        id: 'alerion-ai',
        title: 'Alerion AI',
        description:
            'Real-Time Anomaly Detection with Kafka + WebSocket Distributed Architecture. Designed scalable event-driven architecture with Edge producers and Fog-layer processing via Apache Kafka. Implemented partitioned Kafka topics and consumer groups for fault-tolerant ingestion. Integrated ML inference services and built a WebSocket-powered React dashboard.',
        extendedDescription: 'Alerion AI is designed to monitor and detect anomalies across distributed fog and edge network nodes. By utilizing an event-driven Kafka architecture, the system guarantees strong fault tolerance, processing high-velocity metrics without data loss. It surfaces potential security or operational anomalies dynamically on a responsive frontend.',
        features: [
            'Scalable event-driven architecture with Apache Kafka',
            'Partitioned topics and consumer groups for fault-tolerance',
            'Real-time fog-layer metric processing',
            'Integrated ML anomaly detection services',
            'Live WebSocket-powered React dashboard'
        ],
        architecture: 'Edge nodes act as lightweight producers sending compressed metrics to a central Kafka cluster. Consumer groups process these metrics in parallel, piping them through a Python-based ML detection service before broadcasting anomalies to connected dashboard clients via WebSockets.',
        techStack: ['Kafka', 'WebSocket', 'React', 'Node.js', 'ML', 'Python'],
        github: 'https://github.com/DevanshBehl',
        demo: '#',
    },
    {
        id: 'ageis-sign',
        title: 'AgeisSign',
        description:
            'Secure Asymmetric Document Signing Platform leveraging Edwards Curve Cryptography. Built a tamper-proof document signing platform using Ed25519 asymmetric cryptography for metadata signing. Engineered a hash-based deduplication system to prevent duplicate submissions and implemented an end-to-end signature verification pipeline.',
        extendedDescription: 'AgeisSign focuses on uncompromised digital security for document workflows. By implementing cutting-edge Edwards Curve Cryptography (Ed25519), it guarantees the authenticity, integrity, and non-repudiation of digital signatures. The platform is designed for enterprise grade deployments requiring stringent audit trails.',
        features: [
            'Tamper-proof metadata signing via Ed25519',
            'Secure and fast asymmetric cryptography',
            'Hash-based deduplication system',
            'End-to-end signature verification pipeline',
            'Immutable document integrity checks'
        ],
        architecture: 'The system generates fast, secure Ed25519 keypairs on the client side, ensuring private keys never leave the browser. Document hashes and signatures are transmitted to a Node.js backend which verifies the signature cryptographically before appending it to a secure, write-once ledger.',
        techStack: ['Ed25519', 'Node.js', 'React', 'Cryptography', 'Express'],
        github: 'https://github.com/DevanshBehl',
        demo: '#',
    },
]
