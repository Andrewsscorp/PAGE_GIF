---
title: "Setup: Kali Linux Hardening"
pubDate: 2026-02-14
description: "Configuración de entorno de Pentesting en hardware dedicado ASUS. Optimización de herramientas de red."
tags: ["Kali Linux", "Asus", "Networking", "Bash"]
---

<div class="bg-yellow-900/20 border border-yellow-600/50 p-4 rounded-lg flex items-center gap-4 mb-8">
    <div class="animate-pulse text-yellow-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    </div>
    <div>
        <h3 class="text-yellow-500 font-bold text-sm m-0">DOCUMENTACIÓN EN PROCESO</h3>
        <p class="text-yellow-200/60 text-xs m-0">El auditor está recopilando los logs de instalación y configuración.</p>
    </div>
</div>

# Inventario de Hardware
Para este laboratorio se utiliza una estación dedicada para evitar la contaminación cruzada de datos.

* **Equipo:** ASUS (Modelo Específico)
* **OS:** Kali Linux Rolling (Kernel 6.x)
* **Interfaz de Red:** Modo Monitor habilitado para auditoría Wi-Fi.

## Herramientas Instaladas
```bash
sudo apt update && sudo apt install -y wireshark burpsuite aircrack-ng
