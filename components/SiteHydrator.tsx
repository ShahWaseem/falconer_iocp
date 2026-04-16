'use client';

import { useEffect } from 'react';

export default function SiteHydrator() {
  useEffect(() => {
    // ═══ PAGE NAVIGATION ═══
    function showPage(page: string) {
      document.querySelectorAll('.page-section').forEach((s) => s.classList.remove('active'));
      const t = document.getElementById('page-' + page);
      if (t) t.classList.add('active');
      else document.getElementById('page-home')?.classList.add('active');

      document.querySelectorAll('.nav a').forEach((a) => a.classList.remove('active'));
      document.querySelectorAll('.nav a').forEach((a) => {
        if (a.getAttribute('data-page') === page) a.classList.add('active');
      });
      document.querySelectorAll('.mobile-bar a').forEach((a) => a.classList.remove('active'));
      document.querySelectorAll('.mobile-bar a').forEach((a) => {
        if (a.getAttribute('data-page') === page) a.classList.add('active');
      });

      closeMenu();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.remove('visible'));
        observeReveals();
      }, 100);
    }

    // ═══ MOBILE MENU ═══
    let scrollPos = 0;
    function toggleMenu() {
      const nav = document.getElementById('mainNav');
      const btn = document.getElementById('menuToggle');
      const overlay = document.getElementById('navOverlay');
      if (!nav || !btn || !overlay) return;
      const isOpen = nav.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        scrollPos = window.pageYOffset;
        nav.classList.add('open');
        btn.classList.add('active');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollPos + 'px';
        document.body.style.width = '100%';
      }
    }

    function closeMenu() {
      const nav = document.getElementById('mainNav');
      const btn = document.getElementById('menuToggle');
      const overlay = document.getElementById('navOverlay');
      nav?.classList.remove('open');
      btn?.classList.remove('active');
      overlay?.classList.remove('open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPos);
    }

    // ═══ SOLUTION TABS ═══
    function switchSol(index: number, btn: HTMLElement) {
      document.querySelectorAll('.sol-tab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.sol-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('sol-' + index)?.classList.add('active');
    }

    // ═══ FAQ ACCORDION ═══
    function toggleFaq(item: HTMLElement) {
      item.classList.toggle('open');
    }

    // ═══ FORM SUBMIT ═══
    function handleFormSubmit(e: Event) {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const fields = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'select[required], input[required], textarea[required]'
      );
      let firstInvalid: HTMLElement | null = null;
      let hasError = false;
      fields.forEach((f) => {
        const group = f.closest('.form-group');
        if (!group) return;
        group.classList.remove('error');
        const val = (f.value || '').trim();
        let invalid = !val;
        if ((f as HTMLInputElement).type === 'email' && val) {
          invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        const minLen = (f as HTMLInputElement).minLength;
        if (minLen > 0 && val.length < minLen) invalid = true;
        if (invalid) {
          group.classList.add('error');
          if (!firstInvalid) firstInvalid = f as HTMLElement;
          hasError = true;
        }
      });
      if (hasError) {
        if (firstInvalid) {
          (firstInvalid as HTMLElement).focus();
          (firstInvalid as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      alert('Thank you for your inquiry. Our EDN team will respond within 4 business hours.');
      form.reset();
      form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('error'));
    }

    // Clear error state on interaction
    const clearError = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.matches('select, input, textarea')) {
        const group = t.closest('.form-group');
        if (group) group.classList.remove('error');
      }
    };
    document.addEventListener('input', clearError, true);
    document.addEventListener('change', clearError, true);

    // ═══ SCROLL REVEAL ═══
    function observeReveals() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    }

    // ═══ HEADER SCROLL ═══
    function onScroll() {
      document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 50);
    }

    // ═══ ATTACH EVENT LISTENERS ═══

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    const onResize = () => {
      if (window.innerWidth > 1200) closeMenu();
    };

    const deferredDetachers: Array<() => void> = [];
    let pendingAttachId: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      pendingAttachId = null;

      const onDataPageClick = (e: Event) => {
        const t = e.currentTarget as HTMLElement;
        e.preventDefault();
        showPage(t.dataset.page || 'home');
      };
      document.querySelectorAll('[data-page]').forEach((el) => {
        el.addEventListener('click', onDataPageClick);
        deferredDetachers.push(() => el.removeEventListener('click', onDataPageClick));
      });

      const toggleBtn = document.getElementById('menuToggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMenu);
        deferredDetachers.push(() => toggleBtn.removeEventListener('click', toggleMenu));
      }

      const overlay = document.getElementById('navOverlay');
      if (overlay) {
        overlay.addEventListener('click', closeMenu);
        deferredDetachers.push(() => overlay.removeEventListener('click', closeMenu));
      }

      const moreBtn = document.getElementById('moreToggle');
      if (moreBtn) {
        const onMoreClick = (e: Event) => {
          e.preventDefault();
          toggleMenu();
        };
        moreBtn.addEventListener('click', onMoreClick);
        deferredDetachers.push(() => moreBtn.removeEventListener('click', onMoreClick));
      }

      document.querySelectorAll('.sol-tab').forEach((btn, i) => {
        const handler = () => switchSol(i, btn as HTMLElement);
        btn.addEventListener('click', handler);
        deferredDetachers.push(() => btn.removeEventListener('click', handler));
      });

      document.querySelectorAll('.anon-faq-item').forEach((item) => {
        const handler = () => toggleFaq(item as HTMLElement);
        item.addEventListener('click', handler);
        deferredDetachers.push(() => item.removeEventListener('click', handler));
      });

      const form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', handleFormSubmit);
        deferredDetachers.push(() => form.removeEventListener('submit', handleFormSubmit));
      }

      const infra = document.querySelector('.infra-banner');
      if (infra) {
        const infraHandler = () => showPage('datacenters');
        infra.addEventListener('click', infraHandler);
        deferredDetachers.push(() => infra.removeEventListener('click', infraHandler));
      }

      window.addEventListener('scroll', onScroll);
      deferredDetachers.push(() => window.removeEventListener('scroll', onScroll));

      document.addEventListener('keydown', onKeydown);
      deferredDetachers.push(() => document.removeEventListener('keydown', onKeydown));

      window.addEventListener('resize', onResize);
      deferredDetachers.push(() => window.removeEventListener('resize', onResize));

      observeReveals();
    }, 0);

    // ═══ HERO PARTICLES (Desktop only) ═══
    const container = document.getElementById('heroCanvas');
    let animId: number | null = null;
    if (container && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        container.appendChild(canvas);
        const resize = () => {
          canvas.width = container!.offsetWidth;
          canvas.height = container!.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const ps: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
        for (let i = 0; i < 80; i++) {
          ps.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 0.5,
          });
        }

        const draw = () => {
          if (canvas.width < 10 || canvas.height < 10) {
            animId = requestAnimationFrame(draw);
            return;
          }
          ctx!.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < ps.length; i++) {
            for (let j = i + 1; j < ps.length; j++) {
              const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < 120) {
                ctx!.beginPath();
                ctx!.moveTo(ps[i].x, ps[i].y);
                ctx!.lineTo(ps[j].x, ps[j].y);
                ctx!.strokeStyle = `rgba(0,229,255,${0.08 * (1 - d / 120)})`;
                ctx!.lineWidth = 0.5;
                ctx!.stroke();
              }
            }
          }
          ps.forEach((p) => {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx!.fillStyle = 'rgba(0,229,255,0.4)';
            ctx!.fill();
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          });
          animId = requestAnimationFrame(draw);
        };
        draw();
      }
    }

    // ═══ CLEANUP ═══
    return () => {
      if (pendingAttachId !== null) {
        clearTimeout(pendingAttachId);
        pendingAttachId = null;
      }
      closeMenu();
      deferredDetachers.forEach((d) => d());
      deferredDetachers.length = 0;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('input', clearError, true);
      document.removeEventListener('change', clearError, true);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return null; // This component only adds behavior, renders nothing
}
