# GitHub Actions Deployment Setup

## ✅ Что настроено

### 1. SSH ключ для деплоя
- **Location**: `~/.ssh/deploy_key` (private), `~/.ssh/deploy_key.pub` (public)
- **Type**: ED25519
- **Comment**: github-deploy@namebloom.co

### 2. GitHub Secret добавлен
- **Secret Name**: `VPS_SSH_KEY`
- **Repository**: clickwebstudios/bloggen-ai-mlow1lq8
- Содержит приватный ключ для SSH доступа к VPS

### 3. Workflow файл
- **Path**: `.github/workflows/deploy.yml`
- **Trigger**: Push to `main` branch или manual (workflow_dispatch)
- **Actions**:
  1. Checkout кода
  2. Настройка SSH
  3. Добавление хоста в known_hosts
  4. Git pull на VPS
  5. Перезапуск Docker контейнеров

### 4. Systemd Service
- **File**: `bloggen-ai-mlow1lq8.service`
- Для автозапуска контейнеров после ребута VPS

---

## ⚠️ Требуется доделать на VPS

### Проблема: Нет доступа к Docker
Пользователь `admin2` не входит в группу `docker`, поэтому не может управлять контейнерами.

### Решение
Нужен root доступ к VPS для выполнения:

```bash
# Войти как root на VPS
ssh root@63.250.42.183

# Добавить пользователя в группу docker
usermod -aG docker admin2

# Применить изменения (без перелогина)
newgrp docker

# Проверить
groups admin2
# Должно показать: admin2 ... docker

# Включить автозапуск docker
systemctl enable docker

# Скопировать systemd service
scp bloggen-ai-mlow1lq8.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable bloggen-ai-mlow1lq8
systemctl start bloggen-ai-mlow1lq8
```

---

## 🚀 Как проверить деплой

### 1. Через GitHub Actions
```bash
# Сделать тестовый коммит
git commit --allow-empty -m "Test deployment"
git push origin main

# Следить за выполнением
# https://github.com/clickwebstudios/bloggen-ai-mlow1lq8/actions
```

### 2. Через API
```bash
# Проверить статус последнего запуска (используйте ваш GitHub токен)
curl -s -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/clickwebstudios/bloggen-ai-mlow1lq8/actions/runs
```

### 3. На VPS
```bash
# Проверить что код обновился
ssh -i ~/.ssh/deploy_key admin2@63.250.42.183 \
  "cd /home/admin2/projects/bloggen-ai-mlow1lq8 && git log --oneline -3"

# Проверить статус контейнеров (после фикса docker)
ssh -i ~/.ssh/deploy_key admin2@63.250.42.183 \
  "docker ps"
```

---

## 📁 Файлы проекта

```
bloggen-ai-mlow1lq8/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── bloggen-ai-mlow1lq8.service # Systemd service (для VPS)
├── fix-docker-permissions.sh   # Скрипт для фикса прав (требует root)
├── docker-compose.yml          # Docker конфигурация
└── ...
```

---

## 🔗 Полезные ссылки

- **Actions**: https://github.com/clickwebstudios/bloggen-ai-mlow1lq8/actions
- **Settings > Secrets**: https://github.com/clickwebstudios/bloggen-ai-mlow1lq8/settings/secrets/actions
- **VPS**: 63.250.42.183 (admin2)
