# Documentation Index

Welcome to BioGPT Documentation! This index helps you navigate all available documentation.

## 📚 Main Documents

### 1. **[README.md](./README.md)** - Start Here! 🚀
**Purpose**: Project overview and quick start guide
**Best for**: New users, quick reference, feature overview
**Includes**:
- Project description and key use cases
- Feature highlights
- Complete tech stack breakdown
- Quick start in 5 minutes
- Project structure overview
- API endpoints summary
- Environment configuration
- Development commands
- Docker setup
- Deployment information
- Contributing guidelines

**Read this first** if you're new to the project.

---

### 2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed Setup Instructions
**Purpose**: Step-by-step setup and deployment guide
**Best for**: Setting up the project locally or deploying
**Includes**:
- Prerequisites and system requirements
- Local development setup
- Environment configuration for different LLM providers
- Running the application
- Docker setup and usage
- Production deployment (Vercel, Railway, self-hosted)
- Pre and post-deployment checklists
- Troubleshooting common issues
- Additional help resources

**Read this** when you need to set up the project or deploy.

---

### 3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical Architecture
**Purpose**: Understand the system design and architecture
**Best for**: Developers, contributors, architects
**Includes**:
- System overview diagram
- Directory structure and organization
- Data flow diagrams
- Key design decisions and trade-offs
- Component architecture
- API architecture
- Security architecture
- Performance optimization strategies
- Deployment architecture
- Extension points and customization
- Monitoring and observability
- Future improvements

**Read this** to understand how the system is built.

---

### 4. **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API Reference
**Purpose**: Complete API endpoint documentation
**Best for**: API users, frontend developers, integrations
**Includes**:
- API overview and base URL
- Rate limiting information and headers
- Endpoint documentation:
  - POST /api/generate - Content generation
  - POST /api/chat - Interactive refinement
- Request/response examples
- Error handling and error codes
- Stream event types and handling
- Token usage information
- Best practices
- cURL examples and testing

**Read this** when building with the API.

---

### 5. **[AGENTS.md](./AGENTS.md)** - Coding Guidelines
**Purpose**: Development standards and code style
**Best for**: Contributors, code reviewers
**Includes**:
- Build and development commands
- Code style guidelines
- TypeScript configuration
- Import order conventions
- Naming conventions
- Component structure patterns
- Styling guidelines
- Error handling practices
- API route conventions
- Key dependencies
- File organization

**Read this** before contributing code.

---

## 📖 Reference Guides

### Configuration

- **Environment Variables**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md#environment-configuration)
- **Tailwind CSS**: See [README.md](./README.md#configuration)
- **Next.js**: See [AGENTS.md](./AGENTS.md)

### Development

- **Project Structure**: See [README.md](./README.md#-project-structure) or [ARCHITECTURE.md](./ARCHITECTURE.md#directory-structure-and-module-organization)
- **Tech Stack**: See [README.md](./README.md#-tech-stack)
- **Data Flow**: See [ARCHITECTURE.md](./ARCHITECTURE.md#data-flow-architecture)

### Deployment

- **Deployment Options**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md#production-deployment)
- **Docker Setup**: See [README.md](./README.md#-docker) or [SETUP_GUIDE.md](./SETUP_GUIDE.md#docker-setup)
- **Vercel Deployment**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md#option-1-vercel-recommended)

### API Usage

- **Endpoints**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#endpoints)
- **Rate Limiting**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#rate-limiting)
- **Error Handling**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#error-handling)
- **Examples**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#examples)

---

## 🎯 Quick Navigation by Use Case

### I'm a New Developer
1. Start with [README.md](./README.md) - Get an overview
2. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Set up locally
3. Check [AGENTS.md](./AGENTS.md) - Learn code style
4. Review [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the system

### I Want to Contribute Code
1. Read [AGENTS.md](./AGENTS.md) - Code guidelines
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
3. Check [README.md](./README.md#contributing) - Contributing guidelines
4. See [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Local setup

### I Want to Use the API
1. Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Full API reference
2. Check [README.md](./README.md#-api-endpoints) - Quick endpoint overview
3. Review examples in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#examples)

### I Want to Deploy
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md#production-deployment) - Deployment options
2. Follow deployment checklist in [SETUP_GUIDE.md](./SETUP_GUIDE.md#pre-deployment-checklist)
3. Review environment setup in [SETUP_GUIDE.md](./SETUP_GUIDE.md#environment-configuration)
4. Monitor with [README.md](./README.md#-performance-considerations) tips

### I Need Help Troubleshooting
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) - Troubleshooting guide
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#error-handling) - Error codes
3. See [README.md](./README.md#-troubleshooting) - Common issues
4. Check existing [GitHub Issues](https://github.com/ehsaghaffar/einbiogpt/issues)

---

## 📊 Documentation Structure

```
Documentation
├── README.md                    # Overview and quick start
├── SETUP_GUIDE.md              # Setup and deployment
├── ARCHITECTURE.md             # System design
├── API_DOCUMENTATION.md        # API reference
├── AGENTS.md                   # Code style guidelines
└── DOCUMENTATION_INDEX.md      # This file
```

---

## 🔑 Key Concepts Explained

### LLM Integration
Multiple LLM providers supported:
- **OpenAI** (gpt-4o, gpt-5) - Best quality, requires payment
- **AIHUBMIX** (free models) - Free, good for testing

See [SETUP_GUIDE.md](./SETUP_GUIDE.md#environment-configuration) for setup.

### Rate Limiting
Prevents abuse with per-IP request limits:
- Generate endpoint: 10 requests/hour
- Chat endpoint: 30 requests/hour

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#rate-limiting) for details.

### Streaming Responses
Real-time content generation using Server-Sent Events (SSE):
- Improves UX with progressive rendering
- Reduces perceived latency

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#streaming-responses) for examples.

### Architecture Highlights
- **Client**: React with TypeScript, Tailwind CSS
- **Server**: Next.js App Router with streaming
- **AI**: LangChain + OpenAI/AIHUBMIX
- **Caching**: Redis for rate limiting

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full details.

---

## 🛠️ Common Tasks

### Setup Local Development
Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md#local-development-setup)

### Configure API Keys
See [SETUP_GUIDE.md](./SETUP_GUIDE.md#environment-configuration)

### Run Development Server
See [SETUP_GUIDE.md](./SETUP_GUIDE.md#running-the-application)

### Build Docker Image
See [SETUP_GUIDE.md](./SETUP_GUIDE.md#docker-setup)

### Deploy to Production
See [SETUP_GUIDE.md](./SETUP_GUIDE.md#production-deployment)

### Understand API Endpoints
See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md#endpoints)

### Follow Code Style
See [AGENTS.md](./AGENTS.md)

### Add New Feature
See [ARCHITECTURE.md](./ARCHITECTURE.md#extension-points)

---

## 📝 Document Details

| Document | Length | Read Time | Audience |
|----------|--------|-----------|----------|
| README.md | ~800 lines | 15-20 min | Everyone |
| SETUP_GUIDE.md | ~600 lines | 20-30 min | Developers |
| ARCHITECTURE.md | ~700 lines | 25-35 min | Technical |
| API_DOCUMENTATION.md | ~800 lines | 20-30 min | API Users |
| AGENTS.md | ~130 lines | 10 min | Contributors |

---

## 🔗 Related Resources

### External Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [LangChain JS Docs](https://js.langchain.com/)

### Community
- [GitHub Issues](https://github.com/ehsaghaffar/einbiogpt/issues)
- [GitHub Discussions](https://github.com/ehsaghaffar/einbiogpt/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nextjs)

### Tools & Services
- [Vercel Deployment](https://vercel.com)
- [OpenAI Console](https://platform.openai.com)
- [Upstash Redis](https://upstash.com)
- [GitHub](https://github.com)

---

## 📋 Update History

| Date | Changes | Document |
|------|---------|----------|
| 2026-06-11 | Initial documentation | All |
| 2026-06-11 | Added ARCHITECTURE.md | Architecture |
| 2026-06-11 | Added API_DOCUMENTATION.md | API Reference |
| 2026-06-11 | Added SETUP_GUIDE.md | Setup |
| 2026-06-11 | Comprehensive README update | README |

---

## 💡 Tips for Using Documentation

1. **Search within documents**: Use Ctrl+F (Windows/Linux) or Cmd+F (Mac)
2. **Follow links**: Documentation contains many cross-references
3. **Check the index**: Use "Table of Contents" at the top of each document
4. **Search by keyword**: Look for your question in the quick navigation
5. **Read examples**: Most sections include practical examples

---

## ❓ Can't Find What You're Looking For?

1. **Search all documentation**: Use your browser's find function
2. **Check the Quick Navigation**: See "Quick Navigation by Use Case" above
3. **Review Related Resources**: Links to external docs and communities
4. **Create an issue**: [GitHub Issues](https://github.com/ehsaghaffar/einbiogpt/issues)
5. **Start a discussion**: [GitHub Discussions](https://github.com/ehsaghaffar/einbiogpt/discussions)

---

## 📄 Document Maintenance

Documentation is kept up-to-date with code changes:
- Review [AGENTS.md](./AGENTS.md) for latest guidelines
- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for configuration changes
- See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for endpoint updates

**Last Updated**: 2026-06-11  
**Current Version**: 1.0.0

---

<div align="center">

**Happy coding! 🚀**

[Back to README](./README.md) | [Report Issue](https://github.com/ehsaghaffar/einbiogpt/issues) | [Start Discussion](https://github.com/ehsaghaffar/einbiogpt/discussions)

</div>
