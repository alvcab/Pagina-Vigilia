# Instrucciones para Claude Code

## Git: commit y push automáticos

El usuario pidió explícitamente (2026-08-04) que todo cambio hecho en este repo
se commitee y pushee a `origin/main` sin pedir confirmación primero. No
preguntar antes de hacer `git commit` / `git push` en este repo — hacerlo
directamente al terminar cada tarea, salvo que el propio usuario diga lo
contrario en esa conversación puntual.

Esto NO cambia las demás precauciones de git (revisar `git status`/`git diff`
antes de un `git add` amplio para no subir secretos, no usar `--force` a
`main` sin pedirlo explícitamente, no hacer `git reset --hard` ni descartar
cambios sin avisar).
