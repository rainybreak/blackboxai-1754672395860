# Farzet Portfolio

A modern, responsive portfolio website featuring stunning animations, glassmorphism design, and smooth user experience.

## Features

- **Handwritten Intro Animation**: Elegant Great Vibes font animation with the preserved "Farzet" signature
- **Background Video**: Immersive video background with proper fallback
- **Modern Glassmorphism**: Beautiful glass-effect cards and navigation
- **Smooth Scrolling**: Seamless navigation between sections
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive Elements**: Hover effects, parallax scrolling, and animations
- **Portfolio Sections**:
  - Home with hero section
  - About with feature cards
  - Projects showcase with grid layout
  - Skills with animated progress bars
  - Contact form with email integration

## Setup

1. Clone this repository
2. Add your assets to the `assets/` folder:
   - `profile.jpg` - Your profile picture
   - `video.mp4` - Background video (optional)
3. Open `index.html` in your browser

## Customization

### Update Personal Information

Edit `index.html` to update:
- Name and title in the hero section
- About me content
- Projects (add your own project images and descriptions)
- Skills and percentages
- Social media links
- Contact information

### Update Projects

Replace the project cards in the "Projects Section" with your own:
```html
<div class="project-card glass-card">
    <div class="project-image">
        <img src="your-image.jpg" alt="Project">
        <div class="project-overlay">
            <a href="project-link" class="project-link">View Project →</a>
        </div>
    </div>
    <div class="project-content">
        <h3>Project Title</h3>
        <p>Project description</p>
        <div class="project-tags">
            <span class="tag">Tech</span>
        </div>
    </div>
</div>
```

### Update Skills

Modify the `data-progress` attribute in `index.html`:
```html
<div class="skill-progress" data-progress="95"></div>
```

### Change Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --color-primary: #6366f1;
    --color-accent: #ec4899;
    /* Add your custom colors */
}
```

## Technologies Used

- HTML5
- CSS3 (Glassmorphism, Animations, Grid/Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins, Great Vibes, Space Grotesk)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading images
- Intersection Observer for scroll animations
- RequestAnimationFrame for smooth animations
- Reduced motion support for accessibility
- Optimized CSS with hardware acceleration

## Credits

Created by Farzet (https://farzet.xyz)

## License

This project is open source and available under the MIT License.