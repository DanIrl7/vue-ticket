<template>
  <div class="landing-page">
    <Header />
    <main>
      <section class="hero">
        <div class="decorative-circle circle-2"></div>
        <h1>Welcome to Tickita</h1>
        <p>A robust ticket management system to streamline your workflow.</p>
        <div class="cta-buttons">
          <router-link :to="{ name: 'Login' }" class="btn">Login</router-link>
          <router-link :to="{ name: 'Signup' }" class="btn">Get Started</router-link>
        </div>
      </section>

      <section class="features">
        <h2>Why Choose Tickita?</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Easy to Use</h3>
            <p>Intuitive interface that makes ticket management a breeze.</p>
          </div>
          <div class="feature-card">
            <h3>Powerful Features</h3>
            <p>Everything you need to manage tickets efficiently.</p>
          </div>
          <div class="feature-card">
            <h3>24/7 Support</h3>
            <p>Our team is always here to help you with any issues.</p>
          </div>
        </div>
      </section>

      <section class="testimonials">
        <h2>What Our Users Say</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card">
            <p>"Tickita has transformed how we handle customer support!"</p>
            <span>- John D.</span>
          </div>
          <div class="testimonial-card">
            <p>"The best ticket management system I've ever used."</p>
            <span>- Sarah M.</span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as v;

.landing-page {
  max-width: 1440px;
  margin: 0 auto;
  background-image: url('../../public/ChatGPT\ Image\ Oct\ 24\,\ 2025\,\ 06_59_48\ PM.png');
  background-size: cover;
}

.hero {
  text-align: center;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  color: white;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: white;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: white;
  }
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
}

.circle-2 {
  width: 150px;
  height: 150px;
  background-color: #4e8abf;
  bottom: 30%;
  left: 15%;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background-color: v.$blue;
  color: white;
  border: 3px solid white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: white;
  border: 3px solid v.$light-blue;
  color: v.$blue;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.features {
  padding: 4rem 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 2rem 0;
  border-radius: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: v.$blue;
    font-size: 2.5rem;
  }
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: v.$blue;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
}

.testimonials {
  padding: 4rem 2rem;
  background-color: rgba(248, 249, 250, 0.9);
  margin: 2rem 0;
  border-radius: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: v.$blue;
    font-size: 2.5rem;
  }
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  p {
    font-style: italic;
    color: #333;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  span {
    color: v.$blue;
    font-weight: 500;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem;
  }

  .circle-1 {
    width: 150px;
    height: 150px;
    top: 5%;
    right: 5%;
  }

  .circle-2 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 10%;
  }
}

@media (max-width: 480px) {
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
