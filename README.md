# Online Store

## Store Url

[http://www.alevelwebsite.com](http://www.alevelwebsite.com)

## Swagger Urls

[http://www.alevelwebsite.com:5000/swagger/index.html](http://www.alevelwebsite.com:5000/swagger/index.html)

[http://docker.host.internal:5000/swagger/index.html](http://docker.host.internal:5000/swagger/index.html)

[http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html)

## Update hosts file

### For Windows

#### Enter the following commands in the Command Line (cmd.exe) with Administrative Privileges

#### Backup your original hosts

```
copy /V %WINDIR%\System32\drivers\etc\hosts %WINDIR%\System32\drivers\etc\hosts.alevel.bak
```

#### Modify hosts file

```
echo "0.0.0.0 www.alevelwebsite.com" >> %WINDIR%\System32\drivers\etc\hosts
```

```
echo "127.0.0.1 www.alevelwebsite.com" >> %WINDIR%\System32\drivers\etc\hosts
```

```
echo "192.168.0.1 www.alevelwebsite.com" >> %WINDIR%\System32\drivers\etc\hosts
```

### For Mac or Linux

#### Enter the following commands in the Terminal

#### Backup your original hosts

```
sudo cp /etc/hosts /etc/hosts.alevel.bak
```

#### Modify hosts file

```
sudo -- sh -c -e "echo '0.0.0.0 www.alevelwebsite.com' >> /etc/hosts";
```

```
sudo -- sh -c -e "echo '127.0.0.1 www.alevelwebsite.com' >> /etc/hosts";
```

```
sudo -- sh -c -e "echo '192.168.0.1 www.alevelwebsite.com' >> /etc/hosts";
```

## Build apps and run Docker container

#### Enter the following commands in the Terminal or in the Command Line (cmd.exe)

```
docker-compose build --no-cache
```

```
docker-compose up
```

## Migration tips

#### List Migrations

```
dotnet ef --startup-project Catalog/Catalog.Host migrations list --project Catalog/Catalog.Host
```

```
dotnet ef --startup-project *startup_project_path* migrations list --project *project_path*
```

#### Add Migration

```
dotnet ef --startup-project Catalog/Catalog.Host migrations add InitialMigration --project Catalog/Catalog.Host
```

```
dotnet ef --startup-project *startup_project_path* migrations add *migration_name* --project *project_path*
```

#### Update Migration

```
dotnet ef --startup-project Catalog/Catalog.Host database update InitialMigration --project Catalog/Catalog.Host
```

```
dotnet ef --startup-project *startup_project_path* database update *migration_name* --project *project_path*
```

#### Remove Migration

```
dotnet ef --startup-project Catalog/Catalog.Host migrations remove --project Catalog/Catalog.Host -f
```

```
dotnet ef --startup-project *startup_project_path* migrations remove --project *project_path* -f
```
