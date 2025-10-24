# Windows (CMD)
type nul > projects\management\__init__.py
type nul > projects\management\commands\__init__.py

# Windows (PowerShell)
New-Item projects\management\__init__.py -ItemType File
New-Item projects\management\commands\__init__.py -ItemType File