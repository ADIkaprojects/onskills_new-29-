import re

def main():
    # Read styles.css
    with open('src/styles.css', 'r', encoding='utf-8') as f:
        css = f.read()

    # Update colors and fonts in styles.css
    css = re.sub(r'--color-bg: #F8FAFC;', '--color-bg: #F8FAFC;', css)
    css = re.sub(r'--color-navy: #0A1628;', '--color-navy: #0F172A;', css)
    css = re.sub(r'--color-navy-mid: #0F2040;', '--color-navy-mid: #1E293B;', css)
    css = re.sub(r'--color-accent: #1D6EF5;', '--color-accent: #2563EB;', css)
    css = re.sub(r'--color-accent-hover: #1558D6;', '--color-accent-hover: #1D4ED8;', css)
    css = re.sub(r'--color-accent-light: #EEF4FF;', '--color-accent-light: #EFF6FF;', css)
    css = re.sub(r'--color-accent-glow: rgba\(29, 110, 245, 0.15\);', '--color-accent-glow: rgba(37, 99, 235, 0.15);', css)

    css = re.sub(r'--font-display: "Sora", sans-serif;', '--font-display: "Inter", sans-serif;', css)
    css = re.sub(r'--font-sans: "DM Sans", sans-serif;', '--font-sans: "Inter", sans-serif;', css)
    css = re.sub(r'font-family: "DM Sans", system-ui, sans-serif;', 'font-family: "Inter", system-ui, sans-serif;', css)
    css = re.sub(r'font-family: "Sora", system-ui, sans-serif;', 'font-family: "Inter", system-ui, sans-serif;', css)

    # Note: No changes to green success semantics, so --color-success stays #10B981
    
    css = re.sub(r'rgba\(29, 110, 245', 'rgba(37, 99, 235', css)
    css = re.sub(r'#1D6EF5', '#2563EB', css)
    css = re.sub(r'#0A1628', '#0F172A', css)
    css = re.sub(r'#1558D6', '#1D4ED8', css)

    with open('src/styles.css', 'w', encoding='utf-8') as f:
        f.write(css)

    # Read Landing.tsx
    with open('src/views/Landing.tsx', 'r', encoding='utf-8') as f:
        tsx = f.read()

    # Replace fonts
    tsx = re.sub(r'"Sora, sans-serif"', '"Inter, sans-serif"', tsx)
    tsx = re.sub(r'"DM Sans, sans-serif"', '"Inter, sans-serif"', tsx)
    tsx = re.sub(r'\'Sora, sans-serif\'', '\'Inter, sans-serif\'', tsx)
    tsx = re.sub(r'\'DM Sans, sans-serif\'', '\'Inter, sans-serif\'', tsx)
    tsx = re.sub(r'Sora, sans-serif', 'Inter, sans-serif', tsx)
    tsx = re.sub(r'DM Sans, sans-serif', 'Inter, sans-serif', tsx)

    # Replace hardcoded colors
    tsx = re.sub(r'#1D6EF5', '#2563EB', tsx)
    tsx = re.sub(r'#1558D6', '#1D4ED8', tsx)
    tsx = re.sub(r'#0A1628', '#0F172A', tsx)
    tsx = re.sub(r'#0F2040', '#1E293B', tsx)
    tsx = re.sub(r'rgba\(29,110,245', 'rgba(37,99,235', tsx)
    tsx = re.sub(r'rgba\(29, 110, 245', 'rgba(37, 99, 235', tsx)
    tsx = re.sub(r'rgba\(10,22,40', 'rgba(15,23,42', tsx)
    tsx = re.sub(r'rgba\(10, 22, 40', 'rgba(15, 23, 42', tsx)

    # Hero section background update
    hero_bg_pattern = r'background:\s*"var\(--color-bg\) radial-gradient\(ellipse 80% 60% at 50% 40%, #E8F0FE 0%, transparent 70%\)"'
    hero_bg_replacement = 'background: "var(--color-bg) radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.08) 0%, transparent 70%), linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)", backgroundSize: "100% 100%, 24px 24px, 24px 24px", backgroundPosition: "center, center"'
    
    # We might need to replace just the string instead of the prop entirely
    # Let's do it manually on the specific string since the regex with props might be tricky.
    tsx = tsx.replace(
        '"var(--color-bg) radial-gradient(ellipse 80% 60% at 50% 40%, #E8F0FE 0%, transparent 70%)"',
        '"var(--color-bg) radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.08) 0%, transparent 70%), linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)"\n        }}'
    )
    # The above replace will inject an extra bracket because we replaced something inside the style prop, but wait, the original was:
    # background: "var(--color-bg) radial-gradient(...)",
    # }}
    
    # Let's do a better replace for the hero background string:
    tsx = tsx.replace(
        '"var(--color-bg) radial-gradient(ellipse 80% 60% at 50% 40%, #E8F0FE 0%, transparent 70%)"',
        '"var(--color-bg) radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37, 99, 235, 0.08) 0%, transparent 70%), linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)", backgroundSize: "100% 100%, 32px 32px, 32px 32px", backgroundPosition: "center, center"'
    )

    with open('src/views/Landing.tsx', 'w', encoding='utf-8') as f:
        f.write(tsx)

    print("Replaced successfully")

if __name__ == "__main__":
    main()
