# Instrucciones para Claude Code

## Git: NO hacer commit ni push sin que se pida explícitamente

Instrucción vigente desde 2026-08-04 (reemplaza una instrucción anterior del
mismo día que pedía lo contrario — el usuario la corrigió repetidamente en
conversaciones posteriores porque el auto-commit interrumpía la iteración
rápida sobre un mismo cambio). Regla actual: **nunca hacer `git commit` ni
`git push` a menos que el usuario lo pida explícitamente en esa conversación**
("commitea esto", "sube esto", "haz push", etc.). Aplicar los cambios de
código normalmente y dejarlos sin commitear — el usuario decide cuándo un
cambio está listo para quedar en el historial.

Esto no cambia las demás precauciones de git (revisar `git status`/`git diff`
antes de un `git add` amplio para no subir secretos, no usar `--force` a
`main` sin pedirlo explícitamente, no hacer `git reset --hard` ni descartar
cambios sin avisar).
