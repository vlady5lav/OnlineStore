cd ..
del /f /q "Web\Web.Client\.pnp.cjs"
del /f /q "Web\Web.Client\.pnp.loader.mjs"
del /f /q "Web\Web.Client\.yarn\install-state.gz"
del /f /q "Web\Web.Client\Web.Client.esproj.user"
del /f /q "Web\Web.Client\yarn.lock"
rd /s /q "Web\Web.Client\.yarn\cache"
rd /s /q "Web\Web.Client\.yarn\unplugged"
rd /s /q "Web\Web.Client\bin"
rd /s /q "Web\Web.Client\node_modules"
rd /s /q "Web\Web.Client\obj"
pause
