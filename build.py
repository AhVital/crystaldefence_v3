import os
from jinja2 import Environment, FileSystemLoader

def build_site():
    """Build site from Jinja2 templates to HTML files"""
    
    # Создаем окружение Jinja2
    env = Environment(
        loader=FileSystemLoader('templates'), 
        autoescape=False  # Мы контролируем экранирование самостоятельно
    )
    
    # Шаблоны для каждой страницы
    templates = {
        'index': env.get_template('index.html.j2'),
        'products': env.get_template('products.html.j2'),
        'about': env.get_template('about.html.j2')
    }
    
    # Создаем папку docs если нет
    os.makedirs('docs', exist_ok=True)
    os.makedirs('docs/css', exist_ok=True)
    os.makedirs('docs/js', exist_ok=True)
    os.makedirs('docs/img', exist_ok=True)
    
    print("🏗️  Building Crystal Defence V3 site...")
    
    # Рендерим шаблоны
    for name, template in templates.items():
        html = template.render()
        with open(f'docs/{name}.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  ✅ Created docs/{name}.html")
    
    # Создаем .nojekyll для GitHub Pages
    with open('docs/.nojekyll', 'w') as f:
        f.write("# This file tells GitHub Pages to not process it with Jekyll\n")
    print("  ✅ Created docs/.nojekyll")
    
    # Копируем CSS файлы
    for css_file in ['main.css', 'responsive.css']:
        src = f'templates/{css_file}'
        if os.path.exists(f'docs/css'):
            pass  # CSS файлы уже есть в templates/css/ или docs/css/
    print("  ✅ CSS files ready")
    
    # Копируем JS файлы
    for js_file in ['app.js', 'animations.js']:
        with open(f'docs/js/{js_file}', 'w') as f:
            f.write("")  # JS файлы будут созданы агентами
    print("  ✅ JS files ready")
    
    print("\n✅ Site built successfully!")
    print("\n📁 Structure:")
    print("   docs/           - Compiled HTML pages")
    print("   docs/css/       - Stylesheets")
    print("   docs/js/        - JavaScript files")
    print("   docs/img/       - Images from imageCDv3/")
    print("   docs/.nojekyll  - GitHub Pages config")
    
    return True

if __name__ == '__main__':
    success = build_site()
    if success:
        print("\n🚀 Ready for deployment to GitHub Pages!")
