#!/bin/bash

sudo dnf update
sudo dnf install postgresql15.x86_64 postgresql15-server -y
sudo postgresql-setup --initdb

mv /var/lib/pgsql/data/pg_hba.conf /var/lib/pgsql/data/pg_hba.conf.bak
mv /var/lib/pgsql/data/postgresql.conf /var/lib/pgsql/data/postgresql.conf.bak

cat <<'EOF' > /var/lib/pgsql/data/pg_hba.conf
${pg_hba_file}
EOF

cat <<'EOF' > /var/lib/pgsql/data/postgresql.conf
${postgresql_file}
EOF

sudo systemctl enable postgresql
sudo systemctl start postgresql