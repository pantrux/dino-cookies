#!/bin/bash
# Script para configurar GitHub como segundo remote y hacer push inicial
# Ejecutar después de crear el repositorio en GitHub

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Configuración de GitHub Remote ===${NC}\n"

# Solicitar URL del repositorio
echo -e "${YELLOW}Por favor, ingresa la URL de tu repositorio de GitHub:${NC}"
echo "Ejemplo: https://github.com/tu-usuario/dino-cookies.git"
read -p "URL: " GITHUB_URL

if [ -z "$GITHUB_URL" ]; then
    echo -e "${YELLOW}Error: No se proporcionó URL${NC}"
    exit 1
fi

# Verificar si el remote 'github' ya existe
if git remote | grep -q "^github$"; then
    echo -e "${YELLOW}El remote 'github' ya existe. Actualizando URL...${NC}"
    git remote set-url github "$GITHUB_URL"
else
    echo -e "${GREEN}Agregando remote 'github'...${NC}"
    git remote add github "$GITHUB_URL"
fi

# Mostrar remotes configurados
echo -e "\n${BLUE}Remotes configurados:${NC}"
git remote -v

# Preguntar si desea hacer push
echo -e "\n${YELLOW}¿Deseas hacer push a GitHub ahora? (s/n)${NC}"
read -p "Respuesta: " PUSH_NOW

if [ "$PUSH_NOW" = "s" ] || [ "$PUSH_NOW" = "S" ]; then
    echo -e "\n${GREEN}Haciendo push a GitHub...${NC}"
    git push github main
    
    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}✓ Push completado exitosamente!${NC}"
        echo -e "${BLUE}Tu código ahora está en GitHub y en Gitea${NC}"
        echo -e "\n${YELLOW}Próximo paso:${NC}"
        echo "1. Ve a Cloudflare Dashboard"
        echo "2. Crea una base de datos D1 llamada 'galletas-db'"
        echo "3. Ejecuta el contenido de schema.sql en la consola D1"
        echo "4. Copia el Database ID y actualiza wrangler.toml"
    else
        echo -e "\n${YELLOW}Error al hacer push. Verifica tus credenciales de GitHub.${NC}"
        echo "Puedes intentar manualmente con: git push github main"
    fi
else
    echo -e "\n${BLUE}Puedes hacer push más tarde con:${NC}"
    echo "git push github main"
fi

echo -e "\n${GREEN}=== Configuración completada ===${NC}"
