#!/bin/bash
cd frontend/
npm i
npm run build
cp -r dist/static/ ../backend/static/
cp dist/index.html ../backend/
cd ../backend
dotnet publish --sc -c Release