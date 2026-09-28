import json
import random
import sys
import os

master_path = r"E:\Shreyash\Mixup\Databrick_test\master_question.json"
output_path = r"E:\Shreyash\my workspace\shreyash333.github.io\databrick_mock_test\questions.js"

try:
    with open(master_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except Exception as e:
    print(f"Error reading master file: {e}")
    sys.exit(1)

# Ensure it's a list
if isinstance(data, dict) and 'questions' in data:
    data = data['questions']
elif not isinstance(data, list):
    print("Master JSON format is not a list")
    # try wrapping in list
    data = [data]

# Use all questions, let the frontend handle random sampling
selected = data

processed = []
for q in selected:
    new_q = q.copy()
    
    # Map Correct answer to answer for script.js
    if 'Correct answer' in new_q:
        ans = new_q['Correct answer']
        if isinstance(ans, str):
            ans = [a.strip() for a in ans.split(',')]
        new_q['answer'] = ans
    elif 'correct_answer' in new_q:
        ans = new_q['correct_answer']
        if isinstance(ans, str):
            ans = [a.strip() for a in ans.split(',')]
        new_q['answer'] = ans
    
    # Infer type if not explicitly single/multi
    if 'type' not in new_q:
        if 'answer' in new_q and isinstance(new_q['answer'], list) and len(new_q['answer']) > 1:
            new_q['type'] = 'multi'
        else:
            new_q['type'] = 'single'
            
    processed.append(new_q)

try:
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("const questionsData = ")
        json.dump(processed, f, indent=4)
        f.write(";\n")
    print(f"Successfully generated {len(processed)} questions to {output_path}")
except Exception as e:
    print(f"Error writing output file: {e}")
    sys.exit(1)
