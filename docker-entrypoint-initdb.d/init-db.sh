#!/bin/bash
set -e

# Часть 1: суперпользователь создаёт пользователя и базу
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE USER "$DB_USER" WITH PASSWORD '$DB_PASSWORD';
  CREATE DATABASE "$DB_NAME" OWNER "$DB_USER";
EOSQL

# Часть 2: в новой базе создаём схему — уже от лица её владельца
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_NAME" <<-EOSQL
  CREATE SCHEMA IF NOT EXISTS "$DB_SCHEMA" AUTHORIZATION "$DB_USER";
EOSQL
