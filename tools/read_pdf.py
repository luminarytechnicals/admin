import subprocess, sys
from pathlib import Path
p = Path(sys.argv[1])
try:
 import pymupdf
 doc = pymupdf.open(p)
 print('\n'.join(f'--- PAGE {i+1} ---\n{page.get_text()}' for i,page in enumerate(doc)))
except Exception as e:
 print('PDF extraction unavailable:', repr(e))
