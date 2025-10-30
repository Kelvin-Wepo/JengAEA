import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

def estimate_construction_cost(project_details):
    """
    Use Gemini to get detailed cost estimates and insights for construction projects
    """
    prompt = f"""
    As a construction cost estimation expert, analyze the following project details and provide a detailed cost breakdown:
    
    Project Type: {project_details.get('buildingType', 'N/A')}
    Total Area: {project_details.get('total_area', 0)} square meters
    Location: {project_details.get('location_name', 'N/A')}
    Construction Type: {project_details.get('constructionType', 'N/A')}
    Project Description: {project_details.get('projectDescription', 'N/A')}

    Provide a detailed response in the following JSON format:
    {{
        "cost_analysis": {{
            "base_cost_per_sqm": float,
            "location_multiplier": float,
            "adjusted_cost_per_sqm": float
        }},
        "breakdown": {{
            "materials": {{
                "total": float,
                "details": [
                    {{"item": "concrete", "cost": float, "percentage": float}},
                    {{"item": "steel", "cost": float, "percentage": float}},
                    {{"item": "finishing", "cost": float, "percentage": float}}
                ]
            }},
            "labor": {{
                "total": float,
                "details": [
                    {{"category": "skilled", "cost": float, "percentage": float}},
                    {{"category": "unskilled", "cost": float, "percentage": float}}
                ]
            }},
            "equipment": {{
                "total": float,
                "description": "string"
            }}
        }},
        "recommendations": [
            "string"
        ],
        "risk_factors": [
            "string"
        ]
    }}

    Base your estimates on current Kenyan construction market rates and consider local factors.
    """

    try:
        response = model.generate_content(prompt)
        # Extract the JSON from the response
        response_text = response.text
        # Find the JSON content between curly braces
        json_str = response_text[response_text.find('{'):response_text.rfind('}')+1]
        result = json.loads(json_str)
        return result
    except Exception as e:
        print(f"Error generating cost estimate: {str(e)}")
        return None