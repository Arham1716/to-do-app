# CI/CD Pipeline

## Overview

The pipeline runs on every push and pull request to `main` or `master`.

### CI (Continuous Integration)

| Job      | Steps                                              |
|----------|----------------------------------------------------|
| Backend  | Lint → Test → Build                                |
| Frontend | Lint → Build                                       |
| Docker   | Build backend & frontend images (validation only) |

### CD (Continuous Deployment)

On push to `main`/`master` only:

- **Docker Push**: Build and push images to GitHub Container Registry (`ghcr.io`)
  - `ghcr.io/<owner>/todo-backend`
  - `ghcr.io/<owner>/todo-frontend`

## Enabling Container Registry

1. Push to GitHub and run the workflow.
2. For **private repos**: Go to repo **Settings → Packages** and ensure packages are enabled.
3. Images will appear under your profile’s **Packages** tab.

## Optional: Deploy to VM via SSH

To deploy to your VM after images are pushed, uncomment the `deploy` job in `ci-cd.yml` and add these secrets in **Settings → Secrets and variables → Actions**:

| Secret       | Description                          |
|--------------|--------------------------------------|
| `VM_HOST`    | VM IP or hostname                    |
| `VM_USER`    | SSH username                         |
| `VM_SSH_KEY` | Private SSH key for authentication   |

Update the `script` in the deploy job with your project path on the VM, for example:

```yaml
script: |
  cd /home/user/todo-app
  docker compose pull
  docker compose up -d
```
