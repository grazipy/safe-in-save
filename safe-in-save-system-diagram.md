# Safe in Save - Diagramas de Arquitetura

## Diagrama de Arquitetura do Sistema

```mermaid
graph TB
    subgraph "Cliente Mobile"
        A[Expo App]
        B[React Native UI]
        C[Zustand Store]
        D[Local Storage]
    end
    
    subgraph "API Gateway"
        E[Express Router]
        F[Auth Middleware]
        G[Rate Limiting]
    end
    
    subgraph "Serviços Backend"
        H[Auth Service]
        I[User Service]
        J[Appointment Service]
        K[Mood Service]
        L[Exercise Service]
        M[Chat Service]
        N[Notification Service]
    end
    
    subgraph "Dados"
        O[(PostgreSQL)]
        P[Redis Cache]
        Q[File Storage]
    end
    
    subgraph "Serviços Externos"
        R[Stripe API]
        S[WebRTC]
        T[Push Notifications]
        U[Email Service]
    end
    
    A --> E
    B --> C
    C --> D
    E --> F
    F --> G
    G --> H
    G --> I
    G --> J
    G --> K
    G --> L
    G --> M
    G --> N
    
    H --> O
    I --> O
    J --> O
    K --> O
    L --> O
    M --> O
    N --> O
    
    H --> P
    I --> P
    J --> P
    
    L --> Q
    M --> Q
    
    J --> R
    M --> S
    N --> T
    H --> U
```

## Diagrama de Fluxo de Dados - Acompanhamento de Humor

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App Mobile
    participant API as API Gateway
    participant MS as Mood Service
    participant DB as PostgreSQL
    participant NS as Notification Service
    
    U->>A: Registra humor diário
    A->>API: POST /api/mood-entries
    API->>MS: Processa entrada de humor
    MS->>DB: Salva entrada
    DB-->>MS: Confirma salvamento
    MS->>MS: Analisa padrões
    alt Padrão preocupante detectado
        MS->>NS: Envia alerta
        NS->>A: Push notification
        A->>U: Notificação de alerta
    end
    MS-->>API: Retorna sucesso
    API-->>A: Confirma registro
    A-->>U: Feedback visual
```

## Diagrama de Componentes - Exercícios Terapêuticos

```mermaid
graph LR
    subgraph "Exercise Module"
        A[Exercise List]
        B[Exercise Player]
        C[Progress Tracker]
        D[Audio Player]
        E[Timer Component]
    end
    
    subgraph "Data Layer"
        F[Exercise API]
        G[Progress API]
        H[Audio Files]
    end
    
    A --> F
    B --> F
    B --> D
    B --> E
    C --> G
    D --> H
    
    A --> B
    B --> C
```

## Diagrama de Segurança - Fluxo de Autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant A as App
    participant AS as Auth Service
    participant DB as Database
    participant TS as Token Service
    
    U->>A: Login (email/senha)
    A->>AS: POST /auth/login
    AS->>DB: Verifica credenciais
    DB-->>AS: Usuário válido
    AS->>TS: Gera JWT tokens
    TS-->>AS: Access + Refresh tokens
    AS-->>A: Tokens + dados do usuário
    A->>A: Armazena tokens seguros
    A-->>U: Login bem-sucedido
    
    Note over A,TS: Tokens têm expiração curta
    Note over A: Refresh automático em background
```

## Diagrama de Entidades - Relacionamentos do Banco

```mermaid
erDiagram
    USERS ||--o{ PATIENTS : "has profile"
    USERS ||--o{ THERAPISTS : "has profile"
    PATIENTS ||--o{ APPOINTMENTS : "books"
    THERAPISTS ||--o{ APPOINTMENTS : "provides"
    PATIENTS ||--o{ MOOD_ENTRIES : "records"
    PATIENTS ||--o{ DIARY_ENTRIES : "writes"
    PATIENTS ||--o{ EXERCISE_COMPLETIONS : "completes"
    THERAPY_EXERCISES ||--o{ EXERCISE_COMPLETIONS : "completed in"
    APPOINTMENTS ||--o{ REVIEWS : "reviewed in"
    PATIENTS ||--o{ CHAT_MESSAGES : "sends"
    THERAPISTS ||--o{ CHAT_MESSAGES : "sends"
    CONVERSATIONS ||--o{ CHAT_MESSAGES : "contains"
    USERS ||--o{ REMINDERS : "has"
    
    USERS {
        string id PK
        string email
        string firstName
        string lastName
        string userType
        timestamp createdAt
    }
    
    PATIENTS {
        int id PK
        string userId FK
        string profession
        string anamnesis
        string emergencyContact
    }
    
    THERAPISTS {
        int id PK
        string userId FK
        string crp
        int graduationYear
        decimal sessionPrice
        boolean isVerified
    }
    
    MOOD_ENTRIES {
        int id PK
        int patientId FK
        int mood
        int energy
        int anxiety
        timestamp createdAt
    }
    
    APPOINTMENTS {
        int id PK
        int patientId FK
        int therapistId FK
        timestamp scheduledAt
        string status
        decimal price
    }
```

## Diagrama de Deploy - Infraestrutura

```mermaid
graph TB
    subgraph "Mobile Devices"
        A[iOS App]
        B[Android App]
    end
    
    subgraph "CDN"
        C[Static Assets]
        D[Media Files]
    end
    
    subgraph "Load Balancer"
        E[NGINX]
    end
    
    subgraph "Application Servers"
        F[Node.js Instance 1]
        G[Node.js Instance 2]
        H[Node.js Instance N]
    end
    
    subgraph "Database Cluster"
        I[(PostgreSQL Primary)]
        J[(PostgreSQL Replica)]
    end
    
    subgraph "Cache Layer"
        K[Redis Cluster]
    end
    
    subgraph "External Services"
        L[Stripe]
        M[Push Notifications]
        N[Email Service]
    end
    
    A --> C
    B --> C
    A --> E
    B --> E
    
    E --> F
    E --> G
    E --> H
    
    F --> I
    G --> I
    H --> I
    
    I --> J
    
    F --> K
    G --> K
    H --> K
    
    F --> L
    F --> M
    F --> N