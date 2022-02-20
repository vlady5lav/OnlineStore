del /f /q "Web\Web.Client\.pnp.cjs"
del /f /q "Web\Web.Client\.pnp.loader.mjs"
del /f /q "Web\Web.Client\.yarn\install-state.gz"
rd /s /q "Web\Web.Client\.yarn\cache"
rd /s /q "Web\Web.Client\.yarn\unplugged"
rd /s /q "Web\Web.Client\bin"
rd /s /q "Web\Web.Client\node_modules"
rd /s /q "Web\Web.Client\obj"
pause
