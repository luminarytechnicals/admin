import os, re
for r, d, f in os.walk('.'):
    for file in f:
        if file.endswith('.html'):
            p = os.path.join(r, file)
            with open(p, 'r', encoding='utf-8') as f:
                c = f.read()
            new_c = re.sub(r'<div class="footer-social">.*?</div>', '', c, flags=re.DOTALL)
            with open(p, 'w', encoding='utf-8') as f:
                f.write(new_c)
