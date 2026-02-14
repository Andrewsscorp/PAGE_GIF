import os
import datetime

# --- CONFIGURACIÓN DEL AUDITOR ---
# Carpetas que la IA NO debe leer (Ruido)
IGNORAR_CARPETAS = {
    'node_modules', '.git', '.vscode', 'dist', '.astro', '__pycache__'
}

# Archivos específicos que son muy largos o irrelevantes
IGNORAR_ARCHIVOS = {
    'package-lock.json', 'bun.lockb', 'yarn.lock', 'structure.txt', 
    'audit_project.py', 'generar_backup.py', '.DS_Store'
}

# Extensiones que nos interesan (Código fuente y Configuración)
EXTENSIONES_VALIDAS = (
    '.astro', '.md', '.ts', '.js', '.mjs', '.cjs', 
    '.json', '.css', '.html', '.py'
)

def generar_arbol(ruta_inicio, padding=""):
    """Genera una representación visual del árbol de directorios"""
    resultado = ""
    if padding == "":
        resultado += f"📦 {os.path.basename(os.path.abspath(ruta_inicio))}/\n"
    
    elementos = sorted(os.listdir(ruta_inicio))
    elementos = [e for e in elementos if e not in IGNORAR_CARPETAS and e not in IGNORAR_ARCHIVOS]
    
    for i, elemento in enumerate(elementos):
        ruta_completa = os.path.join(ruta_inicio, elemento)
        es_ultimo = (i == len(elementos) - 1)
        conector = "└── " if es_ultimo else "├── "
        
        if os.path.isdir(ruta_completa):
            resultado += f"{padding}{conector}📂 {elemento}/\n"
            resultado += generar_arbol(ruta_completa, padding + ("    " if es_ultimo else "│   "))
        else:
            if elemento.endswith(EXTENSIONES_VALIDAS):
                resultado += f"{padding}{conector}📄 {elemento}\n"
    return resultado

def generar_resumen_proyecto():
    archivo_salida = "estructura_proyecto_full.txt"
    ruta_raiz = "."  # Escanea desde la raíz del proyecto
    
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    with open(archivo_salida, "w", encoding="utf-8") as f:
        # 1. HEADER PARA LA IA
        f.write("================================================================\n")
        f.write(f" REPORTE DE ESTRUCTURA Y CÓDIGO - AUDITORÍA TI\n")
        f.write(f" Generado: {timestamp}\n")
        f.write(f" Perfil: Contador Público & Auditor TI\n")
        f.write(f" Contexto: Proyecto Astro (Victus & Asus Kali Linux)\n")
        f.write("================================================================\n\n")
        
        # 2. INSTRUCCIONES DE CONTEXTO
        f.write("INSTRUCCIONES PARA LA IA:\n")
        f.write("Este archivo contiene la estructura completa del proyecto y el código fuente.\n")
        f.write("Úsalo para entender las importaciones, rutas y lógica global.\n")
        f.write("La estructura de archivos está al inicio, seguida del contenido detallado.\n\n")

        # 3. MAPA VISUAL (ÁRBOL)
        f.write("--- 🗺️ MAPA DE ARQUITECTURA DEL SISTEMA ---\n")
        try:
            arbol = generar_arbol(ruta_raiz)
            f.write(arbol)
        except Exception as e:
            f.write(f"Error generando árbol: {e}\n")
        f.write("\n" + "="*64 + "\n\n")

        # 4. CONTENIDO DE LOS ARCHIVOS
        f.write("--- 💾 CÓDIGO FUENTE (SOURCE DUMP) ---\n")
        
        for root, dirs, files in os.walk(ruta_raiz):
            # Filtrar carpetas ignoradas para no entrar en ellas
            dirs[:] = [d for d in dirs if d not in IGNORAR_CARPETAS]
            
            for file in files:
                if file in IGNORAR_ARCHIVOS:
                    continue
                
                if file.endswith(EXTENSIONES_VALIDAS):
                    ruta_completa = os.path.join(root, file)
                    # Normalizar ruta para que se vea bien (ej: src/pages/index.astro)
                    ruta_relativa = os.path.relpath(ruta_completa, ruta_raiz).replace("\\", "/")
                    
                    f.write(f"\n>>>>>> ARCHIVO: {ruta_relativa} <<<<<<\n")
                    f.write(f"PATH: {ruta_completa}\n")
                    f.write("-" * 50 + "\n")
                    
                    try:
                        with open(ruta_completa, "r", encoding="utf-8") as contenido:
                            f.write(contenido.read())
                    except Exception as e:
                        f.write(f"[ERROR DE LECTURA: {e}]")
                    
                    f.write("\n" + "-" * 50 + "\n")

    print(f"✅ Reporte forense generado en: {archivo_salida}")
    print(f"📂 Tamaño aproximado: {os.path.getsize(archivo_salida) / 1024:.2f} KB")

if __name__ == "__main__":
    generar_resumen_proyecto()