:: Setup EPiServer CMS and Commerce databases
@echo off

set cms_db=SPA.Cms
set user=SPA
set password=k4i6CZchGJ5fspWbALgz

:: Determine package folders
for /F " tokens=*" %%i in ('dir "..\Packages\EPiServer.CMS.Core*" /b /o:d') do (set cms_core=%%i) 

if "%cms_core%"=="" (
	echo CMS Core package is missing. Please build the project before running the setup.
	exit /b
)

set sql=sqlcmd -S localhost\sqlexpress -E

echo Dropping databases...
%sql% -Q "EXEC msdb.dbo.sp_delete_database_backuphistory N'%cms_db%'"
%sql% -Q "if db_id('%cms_db%') is not null ALTER DATABASE [%cms_db%] SET SINGLE_USER WITH ROLLBACK IMMEDIATE"
%sql% -Q "if db_id('%cms_db%') is not null DROP DATABASE [%cms_db%]"

echo Dropping user...
%sql% -Q "if exists (select loginname from master.dbo.syslogins where name = '%user%') EXEC sp_droplogin @loginame='%user%'"

echo Creating databases...
%sql% -Q "CREATE DATABASE [%cms_db%] COLLATE SQL_Latin1_General_CP1_CI_AS"

echo Creating user...
%sql% -Q "EXEC sp_addlogin @loginame='%user%', @passwd='%password%', @defdb='%cms_db%'"
%sql% -d %cms_db% -Q "EXEC sp_adduser @loginame='%user%'"
%sql% -d %cms_db% -Q "EXEC sp_addrolemember N'db_owner', N'%user%'"

echo Installing CMS database...
%sql% -d %cms_db% -b -i "..\packages\%cms_core%\tools\EPiServer.Cms.Core.sql" > SetupCmsDb.log
%sql% -d %cms_db% -b -i "%windir%\Microsoft.NET\Framework\v3.0\Windows Workflow Foundation\SQL\EN\SqlPersistenceService_Schema.sql" > SetupWorkflows.log
%sql% -d %cms_db% -b -i "%windir%\Microsoft.NET\Framework\v3.0\Windows Workflow Foundation\SQL\EN\SqlPersistenceService_Logic.sql" >> SetupWorkflows.log

Pause