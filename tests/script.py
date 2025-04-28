import random
import asyncio
from playwright.async_api import async_playwright

# URL tu formulario
FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc0XHGox-Hcrxk7rboS2oV7mHKoJWbHkGeLR2xkHX8See9R5A/viewform"

# Aquí debes poner en los corchetes las respuestas de cada pregunta, según corresponda. Se deja imagen de referencia.
respuestas = {
    "pregunta_1": ["Menos de 5 horas", "Entre 5 y 10 horas", "Entre 10 y 20 horas", "Más de 20 horas"],
    "pregunta_2": ["Ninguno", "1 - 2 proyectos", "3 - 5 proyectos", "Más de 5 proyectos"]
}

async def llenar_google_forms():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False) 
        page = await browser.new_page()

        for i in range(50):  # Esta línea determina cuántas respuestas se enviarán y contestaran las preguntas
            print(f"Enviando respuesta {i + 1}...")

            
            await page.goto(FORM_URL)
            await page.wait_for_selector("div[role='radiogroup']", timeout=5000)

            
            preguntas = await page.query_selector_all("div[role='radiogroup']")
            
            for pregunta in preguntas:
                opciones = await pregunta.query_selector_all("div[role='radio']")
                if opciones:
                    opcion_random = random.choice(opciones)
                    await opcion_random.click()
                    await asyncio.sleep(1)

            
            submit_button = await page.query_selector("div[role='button']:has-text('Enviar')")
            if submit_button:
                await submit_button.click()

            print(f"Respuesta {i + 1} enviada.")

            
            await asyncio.sleep(3)
            another_response_button = await page.query_selector("a:has-text('Enviar otra respuesta')")
            if another_response_button:
                await another_response_button.click()
                await asyncio.sleep(2)  

        print("Finalizado: 50 respuestas enviadas.")
        await browser.close()


asyncio.run(llenar_google_forms())
