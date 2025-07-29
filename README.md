# Safe in Save - Plataforma de Terapia Mobile

Uma plataforma completa de terapia mobile desenvolvida com React Native (Expo) e Node.js, focada em fornecer uma experiência segura e eficaz para sessões terapêuticas, acompanhamento de progresso e comunicação entre terapeutas e pacientes.

## 🏗️ Arquitetura

- **Frontend**: React Native com Expo e TypeScript
- **Backend**: Node.js com Express e TypeScript
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Estado Global**: Zustand
- **Validação**: Zod
- **Estilização**: React Native StyleSheet
- **Autenticação**: JWT com refresh tokens
- **Segurança**: Criptografia end-to-end para mensagens

## 📱 Funcionalidades

### Funcionalidades Básicas
- ✅ Sistema de autenticação (login/registro)
- ✅ Perfis diferenciados (paciente/terapeuta)
- ✅ Busca e listagem de terapeutas
- ✅ Sistema de agendamento
- ✅ Videochamadas integradas
- ✅ Sistema de pagamentos (Stripe)
- ✅ Avaliações e reviews

### Funcionalidades Avançadas
- ✅ Acompanhamento de humor diário
- ✅ Biblioteca de exercícios terapêuticos
- ✅ Diário pessoal
- ✅ Sistema de lembretes
- ✅ Chat seguro criptografado
- ✅ Dashboards de progresso
- ✅ Notificações push

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- PostgreSQL (v14 ou superior)
- Git

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd safe-in-save
```

2. **Instale as dependências do frontend**
```bash
npm install
```

3. **Instale as dependências do backend**
```bash
cd server
npm install
cd ..
```

4. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
# Frontend
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn_here

# Backend (server/.env)
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/safe_in_save
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
FRONTEND_URL=http://localhost:8081

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

5. **Configure o banco de dados**
```bash
# Criar banco de dados PostgreSQL
createdb safe_in_save

# Executar migrações
cd server
npm run db:generate
npm run db:migrate

# (Opcional) Executar seeds
npm run db:seed
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

1. **Inicie o backend**
```bash
cd server
npm run dev
```

2. **Inicie o frontend (em outro terminal)**
```bash
npm start
```

3. **Execute no dispositivo/emulador**
- Para iOS: Pressione `i` no terminal do Expo
- Para Android: Pressione `a` no terminal do Expo
- Para Web: Pressione `w` no terminal do Expo

### Produção

1. **Build do backend**
```bash
cd server
npm run build
npm start
```

2. **Build do frontend**
```bash
npx eas build --platform all
```

## 📁 Estrutura do Projeto

```
safe-in-save/
├── app/                          # Expo Router (App Directory)
│   ├── (auth)/                   # Rotas de autenticação
│   ├── (patient)/                # Rotas do paciente
│   ├── (therapist)/              # Rotas do terapeuta
│   └── (shared)/                 # Rotas compartilhadas
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── ui/                   # Componentes base
│   │   ├── forms/                # Formulários
│   │   ├── charts/               # Gráficos
│   │   └── therapy/              # Componentes específicos
│   ├── hooks/                    # Custom hooks
│   ├── services/                 # Serviços e APIs
│   ├── store/                    # Estado global (Zustand)
│   ├── types/                    # Tipos TypeScript
│   ├── utils/                    # Utilitários
│   └── styles/                   # Estilos globais
├── server/                       # Backend API
│   ├── src/
│   │   ├── controllers/          # Controladores
│   │   ├── services/             # Lógica de negócio
│   │   ├── models/               # Modelos de dados
│   │   ├── middleware/           # Middlewares
│   │   ├── routes/               # Rotas da API
│   │   └── utils/                # Utilitários do servidor
│   └── database/
│       ├── migrations/           # Migrações do banco
│       └── seeds/                # Dados iniciais
├── shared/                       # Código compartilhado
├── assets/                       # Recursos estáticos
└── docs/                         # Documentação
```

## 🧪 Testes

```bash
# Testes do frontend
npm test

# Testes do backend
cd server
npm test

# Cobertura de testes
npm run test:coverage
```

## 📝 Scripts Disponíveis

### Frontend
- `npm start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run web` - Executa na web
- `npm test` - Executa os testes
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica tipos TypeScript

### Backend
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor em produção
- `npm run db:generate` - Gera migrações do banco
- `npm run db:migrate` - Executa migrações
- `npm run db:seed` - Executa seeds
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica tipos TypeScript

## 🔒 Segurança

- Autenticação JWT com refresh tokens
- Criptografia end-to-end para mensagens
- Rate limiting nas APIs
- Validação de entrada em todas as rotas
- Headers de segurança com Helmet
- Armazenamento seguro de dados sensíveis
- Conformidade com LGPD

## 🚀 Deploy

### Backend (Railway/Heroku)
1. Configure as variáveis de ambiente
2. Execute `npm run build`
3. Deploy com `git push heroku main`

### Frontend (EAS Build)
1. Configure `eas.json`
2. Execute `eas build --platform all`
3. Submit para as lojas com `eas submit`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

Para suporte, envie um email para support@safeinsave.com ou abra uma issue no GitHub.

---

**Desenvolvido com ❤️ pela equipe Safe in Save**
