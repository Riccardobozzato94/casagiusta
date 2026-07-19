# Guida al Push su GitHub

## Stato Attuale

- **Remote configurato**: `https://github.com/Riccardobozzato94/casagiusta.git` ✅
- **Branch**: `master`
- **Commit locali**: 7 (non pushati)
- **GitHub CLI (`gh`)**: **Non autenticato** ❌
- **Repo remoto**: Presumibilmente già creato su GitHub

---

## Metodo 1 — GitHub CLI (Consigliato)

### 1. Autenticati con GitHub

Apri **Terminale** o **PowerShell** ed esegui:

```powershell
gh auth login
```

Ti guiderà attraverso:
1. Seleziona **GitHub.com**
2. Seleziona **HTTPS** (o SSH se hai chiavi configurate)
3. Rispondi **Y** per autenticarti nel browser
4. Verrà aperto il browser — fai login con le tue credenziali GitHub
5. Authorizza l'app `gh`

> **Alternativa (token)**: Se preferisci un token, genera un Personal Access Token su https://github.com/settings/tokens (classic, spunta `repo`), poi usa:
> ```powershell
> gh auth login --with-token < token.txt
> ```

### 2. Verifica autenticazione

```powershell
gh auth status
```

Dovresti vedere:
```
✓ Logged in to github.com as Riccardobozzato94
```

### 3. Fai il push

```powershell
cd C:\Users\Ric\Desktop\casagiusta
git push -u origin master
```

---

## Metodo 2 — Token Personale (Senza gh)

Se non vuoi installare/autenticare `gh`:

### 1. Crea un Personal Access Token

1. Vai su https://github.com/settings/tokens
2. Clicca **Generate new token (classic)**
3. Dai un nome (es. `casagiusta-push`)
4. Spunta `repo` (tutti i permessi)
5. Clicca **Generate token**
6. **COPIA SUBITO IL TOKEN** (es. `ghp_xxxxxxxxxxxxxxxxxxxx`)

### 2. Push con token

```powershell
git remote set-url origin https://Riccardobozzato94:IL_TUO_TOKEN@github.com/Riccardobozzato94/casagiusta.git
git push -u origin master
```

> ⚠️ **Sicurezza**: Dopo il push, reimposta l'URL remoto originale:
> ```powershell
> git remote set-url origin https://github.com/Riccardobozzato94/casagiusta.git
> ```

---

## Metodo 3 — Credential Manager (Windows)

Se usi Git per Windows con Git Credential Manager:

```powershell
git push -u origin master
```

Si aprirà automaticamente una finestra di login GitHub. Inserisci le tue credenziali (o fai SSO).

---

## Verifica del Push

Dopo aver pushato, verifica:

```powershell
git log --oneline --all --graph
```

Dovresti vedere il tuo branch `master` allineato con `origin/master`.

Poi visita: https://github.com/Riccardobozzato94/casagiusta

---

## Problemi Comuni

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| `repository not found` | Il repo remoto non esiste | Crearlo su GitHub: `gh repo create casagiusta --public` o da web |
| `Permission denied` | Token errato o non autorizzato | Rigenera token con permessi `repo` |
| `refusing to merge` | Storia divergente | Usa `git pull --rebase origin master` prima di pushare |
| `failed to push` (port 443) | Blocco firewall/antivirus | Usa SSH invece di HTTPS, o aggiungi eccezione firewall |

---

## Comandi Rapidi (copiaincolla)

```powershell
# Opzione 1: gh auth login + push
gh auth login
cd C:\Users\Ric\Desktop\casagiusta
git push -u origin master

# Opzione 2: Push con token
cd C:\Users\Ric\Desktop\casagiusta
git remote set-url origin https://Riccardobozzato94:IL_TUO_TOKEN@github.com/Riccardobozzato94/casagiusta.git
git push -u origin master
git remote set-url origin https://github.com/Riccardobozzato94/casagiusta.git
```
