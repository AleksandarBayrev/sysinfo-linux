#!/bin/bash
cd frontend/
npm i
npm run build:dev
cp -r dist/static/* ../backend/static/
cp dist/index.html ../backend/
cd ../backend
rm -rfv ../buildresult
mkdir ../buildresult
dotnet publish --sc -c Release -o ../buildresult
