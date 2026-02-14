---
title: "PROJECT: AES-256_AUTH"
pubDate: 2026-02-14
description: "Auditoría técnica de sistema de autenticación cifrado. Estado: ENDURECIDO."
tags: ["Blue Team", "Criptografía", "Python", "Secure Code"]
---

<div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-wrap gap-4 items-center justify-between mb-8 shadow-lg shadow-green-900/10">
    <div class="flex items-center gap-2">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span class="text-green-400 font-mono font-bold text-sm">ESTADO: SISTEMA SEGURO</span>
    </div>
    <div class="text-slate-400 text-xs font-mono">
        ID_AUDITORÍA: #AUTH-2026-X8
    </div>
</div>

# 1. Resumen Ejecutivo
Este módulo de autenticación fue desarrollado en la estación de trabajo **HP Victus** y sometido a pruebas de penetración en **Kali Linux (Asus)**. El objetivo principal fue mitigar la exfiltración de credenciales.

<div class="flex gap-4 my-8 not-prose">
    <a href="#" class="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-md font-bold transition-all shadow-lg hover:shadow-green-500/20 no-underline">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        Descargar Reporte PDF
    </a>
    <a href="#" class="flex items-center gap-2 border border-slate-600 hover:border-white text-slate-300 hover:text-white px-6 py-3 rounded-md font-bold transition-all no-underline">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        Ver Código en GitHub
    </a>
</div>

## 2. Especificaciones Técnicas
Para garantizar la confidencialidad, implementé un esquema de defensa en profundidad:

| Componente | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Cifrado** | AES-256 (CBC Mode) | Hacer ilegible la data en reposo. |
| **Integridad** | HMAC-SHA256 | Detectar manipulación de datos. |
| **DB** | SQLite + SQLCipher | Base de datos autocontenida y cifrada. |

---

# 3. Análisis de Vulnerabilidades (PoC)

El sistema original era vulnerable. A continuación, muestro la prueba de concepto (PoC) del ataque que repliqué en mi laboratorio.

<div class="my-6 rounded-lg overflow-hidden bg-[#0d1117] border border-slate-700 shadow-2xl">
    <div class="bg-slate-800/50 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="ml-2 text-xs text-slate-400 font-mono">kali@asus-lab:~</span>
    </div>
    <div class="p-4 font-mono text-sm overflow-x-auto">
        <div class="text-green-400">$ python3 exploit_sql.py --target 192.168.1.50</div>
        <div class="text-slate-300 mt-1">[+] Target locked.</div>
        <div class="text-slate-300">[+] Injecting payload: <span class="text-red-400">' OR '1'='1</span></div>
        <div class="text-yellow-300 mt-2">[!] VULNERABILITY CONFIRMED: Admin access granted without password.</div>
        <div class="text-slate-500 mt-2">Exiting...</div>
    </div>
</div>

### Solución: Sanitización de Inputs
Se reescribió la capa de acceso a datos. Ahora, el sistema utiliza **consultas parametrizadas** estrictas, lo que neutraliza el vector de ataque anterior.

> **Resultado:** En la re-auditoría realizada el 14/02/2026, el ataque falló y la IP atacante fue baneada automáticamente por 3 intentos fallidos.

---

<div class="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r-lg my-8">
    <h3 class="text-green-400 font-bold text-lg m-0 mb-2">✅ Conclusión de Auditoría</h3>
    <p class="text-slate-300 m-0">El módulo cumple con los estándares OWASP Top 10. Se recomienda su despliegue en producción bajo monitoreo continuo.</p>
</div>