import React, { useState, useEffect, useRef } from "react";
import {
  Mountain,
  Star,
  MapPin,
  Utensils,
  Zap,
  Users,
  Calendar,
  CreditCard,
  MessageCircle,
  Shield,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Leaf,
  Zap as ZapIcon,
  Droplet,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
} from "lucide-react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showChat, setShowChat] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [itinerary, setItinerary] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [openExperiences, setOpenExperiences] = useState({});
  const [openTestimonials, setOpenTestimonials] = useState({});
  const [openBlog, setOpenBlog] = useState({});
  const videoRef = useRef(null);

  // Enhanced mock data
  const experiences = [
    {
      id: 1,
      title: "Vivencia Andina",
      subtitle: "Conexión auténtica con comunidades",
      description:
        "Vive tres días con una familia en el Valle Sagrado, participa en sus actividades diarias y aprende sobre su cosmovisión.",
      image: "https://placehold.co/600x400/8B4513/FFFFFF?text=Vida+Andina",
      duration: "3-4 días",
      difficulty: "Fácil",
      price: "Desde S/ 850",
      includes: [
        "Alojamiento familiar",
        "Comidas tradicionles",
        "Taller de tejido",
        "Guía bilingüe",
        "Transporte local",
      ],
      category: "vivencial",
      highlights: [
        "Intercambio cultural",
        "Agricultura andina",
        "Cocina tradicional",
        "Artesanía",
      ],
      details:
        "Esta experiencia te permite vivir como un miembro más de la familia anfitriona. Participarás en actividades agrícolas, aprenderás sobre medicina tradicional andina y compartirás momentos íntimos con la familia.",
    },
    {
      id: 2,
      title: "Lares Premium",
      subtitle: "Aventura con comodidad extrema",
      description:
        "Trekking exclusivo con cabañas de lujo, comidas gourmet y servicios de bienestar en medio de paisajes espectaculares.",
      image: "https://placehold.co/600x400/228B22/FFFFFF?text=Lares+Premium",
      duration: "4 días",
      difficulty: "Moderado",
      price: "Desde S/ 2,200",
      includes: [
        "Glamping premium",
        "Chef personal",
        "Masajes andinos",
        "Equipo completo",
        "Fotógrafo profesional",
      ],
      category: "aventura",
      highlights: [
        "Cabañas de lujo",
        "Comidas gourmet",
        "Spa en la montaña",
        "Stargazing",
      ],
      details:
        "Nuestro trekking Lares Premium combina la aventura de caminar por senderos ancestrales con el lujo de cabañas equipadas con camas cómodas, baños privados y servicios de bienestar. Cada noche termina con una cena gourmet y vistas al cielo estrellado.",
    },
    {
      id: 3,
      title: "Pachamama Ritual",
      subtitle: "Ceremonia sagrada andina",
      description:
        "Participa en una ceremonia auténtica guiada por un paqo (sabio andino) para agradecer a la Madre Tierra.",
      image: "https://placehold.co/600x400/CD853F/FFFFFF?text=Ritual+Andino",
      duration: "1 día",
      difficulty: "Fácil",
      price: "Desde S/ 380",
      includes: [
        "Ceremonia guiada",
        "Ofrenda ceremonial",
        "Explicación cultural",
        "Fotografía profesional",
        "Elementos ceremoniales",
      ],
      category: "espiritual",
      highlights: [
        "Ceremonia auténtica",
        "Meditación guiada",
        "Conexión espiritual",
        "Sabiduría ancestral",
      ],
      details:
        "La ceremonia del pago a la tierra es un ritual ancestral andino que honra a Pachamama (Madre Tierra). Guiado por un paqo, aprenderás sobre la cosmovisión andina y participarás en la preparación de la ofrenda con elementos naturales que representan agradecimiento y equilibrio.",
    },
    {
      id: 4,
      title: "Machu Picchu Privado",
      subtitle: "Experiencia VIP exclusiva",
      description:
        "Visita privada a Machu Picchu con acceso temprano, almuerzo gourmet y guía especializado solo para ti.",
      image: "https://placehold.co/600x400/DAA520/FFFFFF?text=Machu+Picchu+VIP",
      duration: "2 días",
      difficulty: "Fácil",
      price: "Desde S/ 1,650",
      includes: [
        "Traslado privado",
        "Entrada VIP",
        "Almuerzo gourmet",
        "Fotógrafo personal",
        "Guía especializado",
      ],
      category: "premium",
      highlights: [
        "Acceso exclusivo",
        "Almuerzo con vista",
        "Sesión de fotos",
        "Tiempo ilimitado",
      ],
      details:
        "Nuestra experiencia VIP en Machu Picchu comienza con un traslado privado desde tu hotel. Accederás al sitio arqueológico antes que los grupos turísticos regulares, disfrutarás de un almuerzo gourmet con vista panorámica y tendrás un guía especializado solo para ti durante todo el recorrido.",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      country: "España",
      text: "Vivir con una familia en el Valle Sagrado cambió mi perspectiva sobre el turismo. Auténtico y transformador.",
      rating: 5,
      image: "https://placehold.co/80x80/4169E1/FFFFFF?text=MG",
      experience: "Vivencia Andina",
      fullTestimonial:
        "Pasé tres días con la familia Quispe en el Valle Sagrado. Desde el primer momento me trataron como a un miembro más de la familia. Aprendí sobre sus tradiciones, ayudé en el campo y compartimos comidas deliciosas. Esta experiencia me hizo entender el verdadero significado de la hospitalidad andina.",
    },
    {
      name: "Carlos Mendoza",
      country: "México",
      text: "El Lares Trek con glamping fue una experiencia de lujo en medio de la naturaleza. Perfectamente organizado.",
      rating: 5,
      image: "https://placehold.co/80x80/8B0000/FFFFFF?text=CM",
      experience: "Lares Premium",
      fullTestimonial:
        "Había hecho varios trekking antes, pero el Lares Premium superó todas mis expectativas. Después de un día de caminata por paisajes espectaculares, llegábamos a cabañas de lujo con camas cómodas, baños calientes y una cena gourmet preparada por un chef personal. La combinación de aventura y comodidad fue perfecta.",
    },
    {
      name: "Sophie Dubois",
      country: "Francia",
      text: "La ceremonia del pago a la tierra fue profundamente conmovedora. Gracias por compartir su cultura con respeto.",
      rating: 5,
      image: "https://placehold.co/80x80/9370DB/FFFFFF?text=SD",
      experience: "Pachamama Ritual",
      fullTestimonial:
        "Como persona interesada en espiritualidad, la ceremonia del pago a la tierra fue una de las experiencias más profundas de mi vida. El paqo nos guió con sabiduría y respeto, explicando cada paso del ritual. Sentí una conexión genuina con la naturaleza y una profunda gratitud por todo lo que la Pachamama nos ofrece.",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Las Mejores Épocas para Visitar Cusco",
      excerpt:
        "Descubre cuándo visitar para evitar multitudes y disfrutar del clima ideal, con consejos locales que no encontrarás en guías tradicionales.",
      image: "https://placehold.co/600x400/8B4513/FFFFFF?text=Época+Ideal",
      readTime: "5 min",
      content:
        "Cusco tiene dos estaciones principales: la seca (abril a octubre) y la lluviosa (noviembre a marzo). La temporada seca es la más popular, especialmente junio, julio y agosto, cuando se celebran festividades importantes como Inti Raymi. Sin embargo, si prefieres evitar multitudes, considera visitar en abril, mayo, septiembre u octubre, cuando el clima sigue siendo bueno pero hay menos turistas. La temporada de lluvias tiene sus ventajas: paisajes más verdes, precios más bajos y una experiencia más auténtica, aunque debes estar preparado para algunas lluvias por la tarde.",
    },
    {
      id: 2,
      title: "Gastronomía Andina: Qué Probar",
      excerpt:
        "Una guía completa de los platos tradicionales que no puedes dejar de probar, desde el cuy hasta los chicharrones de alpaca.",
      image: "https://placehold.co/600x400/CD853F/FFFFFF?text=Gastronomía",
      readTime: "7 min",
      content:
        "La cocina cusqueña es una fusión de tradiciones prehispánicas e influencias coloniales. Debes probar el cuy asado, un plato ceremonial tradicional; el alpaca, una carne magra y sabrosa; y el rocoto relleno, un ají picante relleno de carne y frutas. No te pierdas los mercados locales como San Pedro, donde puedes probar chicha morada, humitas y tamales. Para los más aventureros, el cuy y los chicharrones de alpaca son experiencias gastronómicas únicas que conectan con la tradición andina.",
    },
    {
      id: 3,
      title: "Respeto Cultural en Comunidades",
      excerpt:
        "Cómo interactuar con respeto y autenticidad con las comunidades andinas, entendiendo sus costumbres y tradiciones.",
      image: "https://placehold.co/600x400/228B22/FFFFFF?text=Respeto+Cultural",
      readTime: "6 min",
      content:
        "Cuando visites comunidades andinas, recuerda que estás siendo invitado a su espacio. Siempre pide permiso antes de tomar fotografías, especialmente a personas. Evita tocar objetos ceremoniales o entrar a áreas privadas sin invitación. La puntualidad es importante, pero en contextos comunitarios el tiempo tiene una percepción más flexible. Ofrece un pequeño presente (una ofrenda) como muestra de respeto. Habla con voz baja y mantén una actitud humilde. Recuerda que estás aprendiendo de su sabiduría ancestral, no simplemente 'observando' una cultura exótica.",
    },
  ];

  const questions = [
    {
      question: "¿Cuántos días tienes disponibles para tu viaje?",
      options: ["3-4 días", "5-7 días", "8+ días", "Solo un día"],
    },
    {
      question: "¿Qué tipo de experiencias te interesan más?",
      options: [
        "Culturales y vivenciales",
        "Aventura y naturaleza",
        "Espiritualidad",
        "Lujo y comodidad",
      ],
    },
    {
      question: "¿Cuál es tu presupuesto aproximado?",
      options: [
        "Hasta S/ 1,000",
        "S/ 1,000 - 2,500",
        "S/ 2,500 - 5,000",
        "Sin límite",
      ],
    },
  ];

  const sustainabilityStats = [
    {
      icon: <Heart className="h-6 w-6" />,
      value: "65%",
      label: "a comunidades",
    },
    { icon: <Leaf className="h-6 w-6" />, value: "100%", label: "sostenible" },
    { icon: <ZapIcon className="h-6 w-6" />, value: "500+", label: "familias" },
    { icon: <Droplet className="h-6 w-6" />, value: "0", label: "plástico" },
  ];

  const generateItinerary = (answers) => {
    const baseItinerary = {
      title: "Tu Viaje Personalizado",
      duration: answers[0] || "5 días",
      budget: answers[2] || "S/ 2,500",
      highlights: [],
    };

    if (answers[1] === "Culturales y vivenciales") {
      baseItinerary.highlights.push(
        "Experiencia vivencial con familia local",
        "Taller de textiles andinos",
        "Mercado tradicional de Pisac",
        "Cocina andina con ingredientes locales"
      );
    } else if (answers[1] === "Aventura y naturaleza") {
      baseItinerary.highlights.push(
        "Trekking alternativo (Lares o Salkantay)",
        "Acampada en glamping premium",
        "Visita a lagunas de montaña",
        "Stargazing con telescopio"
      );
    } else if (answers[1] === "Espiritualidad") {
      baseItinerary.highlights.push(
        "Ceremonia del pago a la tierra",
        "Meditación en lugares sagrados",
        "Encuentro con sabio andino",
        "Retiro de silencio"
      );
    } else {
      baseItinerary.highlights.push(
        "Tour privado a Machu Picchu",
        "Almuerzo gourmet con vista",
        "Spa andino tradicional",
        "Traslados privados con conductor bilingüe"
      );
    }

    baseItinerary.highlights.push(
      "Traslados privados",
      "Guía especializado",
      "Soporte 24/7",
      "Seguro de viaje incluido"
    );

    return baseItinerary;
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setItinerary(generateItinerary(newAnswers));
    }
  };

  const resetItinerary = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setItinerary(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "experiences",
        "itinerary",
        "testimonials",
        "sustainability",
        "blog",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleExperience = (id) => {
    setOpenExperiences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleTestimonial = (id) => {
    setOpenTestimonials((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleBlogPost = (id) => {
    setOpenBlog((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          darkMode
            ? "bg-gray-950/95 backdrop-blur-xl border-gray-800"
            : "bg-white/95 backdrop-blur-xl border-gray-200"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div
                className={`p-2 rounded-xl ${
                  darkMode ? "bg-emerald-900/50" : "bg-emerald-100"
                } mr-3`}
              >
                <Mountain
                  className={`h-7 w-7 ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-amber-500 to-orange-400 bg-clip-text text-transparent">
                AndeanPath
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              {[
                "home",
                "experiences",
                "itinerary",
                "testimonials",
                "sustainability",
                "blog",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium capitalize transition-all duration-300 hover:scale-105 ${
                    activeSection === item
                      ? `bg-gradient-to-r from-emerald-500 to-amber-400 bg-clip-text text-transparent font-semibold`
                      : `${
                          darkMode
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                  }`}
                >
                  {item === "itinerary"
                    ? "Arma tu viaje"
                    : item === "sustainability"
                    ? "Impacto"
                    : item}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 text-yellow-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {menuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            className={`md:hidden ${
              darkMode ? "bg-gray-900/95" : "bg-white/95"
            } backdrop-blur-xl border-t border-gray-200 dark:border-gray-800`}
          >
            <div className="px-6 py-4 space-y-3">
              {[
                "home",
                "experiences",
                "itinerary",
                "testimonials",
                "sustainability",
                "blog",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 text-base capitalize rounded-xl transition-colors ${
                    activeSection === item
                      ? `${
                          darkMode
                            ? "bg-emerald-900/30 text-emerald-400"
                            : "bg-emerald-50 text-emerald-600"
                        } font-semibold`
                      : `${
                          darkMode
                            ? "text-gray-300 hover:bg-gray-800"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                  }`}
                >
                  {item === "itinerary"
                    ? "Arma tu viaje"
                    : item === "sustainability"
                    ? "Impacto"
                    : item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40"></div>
          <img
            src="https://placehold.co/1920x1080/8B4513/FFFFFF?text=Paisajes+de+Cusco"
            alt="Cusco Landscape"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={toggleVideo}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white" />
          )}
        </button>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Sparkles className="h-4 w-4 text-amber-300 mr-2" />
              <span className="text-white text-sm font-medium">
                Nuevas experiencias 2024
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Viajes auténticos en{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Cusco y los Andes
              </span>
            </h1>

            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Descubre experiencias únicas, sostenibles y profundamente
              personales que conectan con la esencia de los Andes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("itinerary")}
                className="bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 flex items-center justify-center space-x-3 group"
              >
                <span>Arma tu viaje en 5 minutos</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection("experiences")}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  darkMode
                    ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    : "bg-white/20 backdrop-blur-sm border border-gray-200 text-gray-800 hover:bg-white/30"
                }`}
              >
                Explorar experiencias
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 animate-bounce">
          <div
            className={`p-3 rounded-2xl ${
              darkMode ? "bg-emerald-900/50" : "bg-emerald-100"
            } backdrop-blur-sm`}
          >
            <Mountain
              className={`h-8 w-8 ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            />
          </div>
        </div>

        <div className="absolute top-20 right-10 animate-pulse">
          <div
            className={`p-3 rounded-2xl ${
              darkMode ? "bg-amber-900/50" : "bg-amber-100"
            } backdrop-blur-sm`}
          >
            <Sun
              className={`h-8 w-8 ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section
        id="experiences"
        className={`py-24 ${darkMode ? "bg-gray-950" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
              Experiencias Diferenciadas
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Cada viaje está diseñado para conectar profundamente con la
              cultura andina, ofreciendo autenticidad, sostenibilidad y momentos
              inolvidables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl ${
                  darkMode
                    ? "bg-gray-900/50 backdrop-blur-sm border border-gray-800"
                    : "bg-white/80 backdrop-blur-sm shadow-xl border border-gray-100"
                }`}
              >
                <div className="relative">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                      exp.category === "vivencial"
                        ? "bg-emerald-500/90 text-white"
                        : exp.category === "aventura"
                        ? "bg-amber-500/90 text-white"
                        : exp.category === "espiritual"
                        ? "bg-purple-500/90 text-white"
                        : "bg-orange-500/90 text-white"
                    }`}
                  >
                    {exp.category === "vivencial"
                      ? "Vivencial"
                      : exp.category === "aventura"
                      ? "Aventura"
                      : exp.category === "espiritual"
                      ? "Espiritual"
                      : "Premium"}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                      <p
                        className={`text-lg ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {exp.subtitle}
                      </p>
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        darkMode ? "text-amber-400" : "text-amber-600"
                      }`}
                    >
                      {exp.price}
                    </div>
                  </div>

                  <p
                    className={`text-lg mb-6 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {exp.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Calendar
                        className={`h-5 w-5 mr-2 ${
                          darkMode ? "text-emerald-400" : "text-emerald-500"
                        }`}
                      />
                      <span className="font-medium">{exp.duration}</span>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exp.difficulty === "Fácil"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : exp.difficulty === "Moderado"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {exp.difficulty}
                    </div>
                  </div>

                  <div
                    className={`border-t ${
                      darkMode ? "border-gray-800" : "border-gray-200"
                    } pt-6 mb-6`}
                  >
                    <h4 className="font-semibold mb-3">Incluye:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {exp.includes.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Check
                            className={`h-4 w-4 mr-2 ${
                              darkMode ? "text-emerald-400" : "text-emerald-500"
                            }`}
                          />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExperience(exp.id)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                      darkMode
                        ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                        : "bg-gradient-to-r from-emerald-600 to-amber-600 text-white hover:shadow-lg hover:shadow-emerald-500/25"
                    }`}
                  >
                    {openExperiences[exp.id]
                      ? "Ocultar detalles"
                      : "Ver detalles completos"}
                    {openExperiences[exp.id] ? (
                      <ChevronUp className="h-5 w-5 ml-2" />
                    ) : (
                      <ChevronDown className="h-5 w-5 ml-2" />
                    )}
                  </button>

                  {/* Expandable Content */}
                  {openExperiences[exp.id] && (
                    <div
                      className={`mt-6 p-6 rounded-2xl ${
                        darkMode ? "bg-gray-800/70" : "bg-gray-50"
                      } transition-all duration-300 animate-fadeIn`}
                    >
                      <h4 className="font-semibold text-lg mb-3">
                        Detalles de la experiencia
                      </h4>
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {exp.details}
                      </p>

                      <h5 className="font-semibold mt-4 mb-2">
                        Aspectos destacados:
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {exp.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center">
                            <Check
                              className={`h-4 w-4 mr-2 ${
                                darkMode
                                  ? "text-emerald-400"
                                  : "text-emerald-500"
                              }`}
                            />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <MapPin className="h-6 w-6" />,
                label: "Lugares únicos",
                value: "30+",
              },
              {
                icon: <Utensils className="h-6 w-6" />,
                label: "Cocina auténtica",
                value: "100%",
              },
              {
                icon: <Users className="h-6 w-6" />,
                label: "Comunidades",
                value: "15+",
              },
              {
                icon: <ZapIcon className="h-6 w-6" />,
                label: "Aventuras",
                value: "8",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-900/50 hover:bg-gray-800/50"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                    darkMode
                      ? "bg-emerald-900/30 text-emerald-400"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{item.value}</div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Generator */}
      <section
        id="itinerary"
        className={`py-24 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div
              className={`text-center mb-16 p-10 rounded-3xl ${
                darkMode
                  ? "bg-gray-800/50 backdrop-blur-sm border border-gray-800"
                  : "bg-white/80 backdrop-blur-sm shadow-xl border border-gray-100"
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-amber-500/20 mb-6">
                <Sparkles className="h-4 w-4 text-amber-400 mr-2" />
                <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  Inteligencia Artificial
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Arma tu viaje en{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                  5 minutos
                </span>
              </h2>
              <p
                className={`text-xl mb-10 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Nuestro asistente virtual crea tu experiencia perfecta basada en
                tus intereses, tiempo y presupuesto.
              </p>

              {!itinerary ? (
                <div
                  className={`p-8 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800/70 backdrop-blur-sm"
                      : "bg-white/70 backdrop-blur-sm shadow-lg"
                  }`}
                >
                  <div className="mb-8">
                    <div className="flex justify-between mb-4">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1/3 h-2 rounded-full ${
                            index <= currentQuestion
                              ? "bg-gradient-to-r from-emerald-500 to-amber-500"
                              : darkMode
                              ? "bg-gray-700"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-center text-gray-400">
                      Pregunta {currentQuestion + 1} de {questions.length}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-2xl p-6 mb-6">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                      {questions[currentQuestion].question}
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className={`p-5 text-left rounded-xl border-2 transition-all duration-300 text-lg font-medium ${
                              darkMode
                                ? "border-gray-700 hover:border-emerald-500 hover:bg-gray-700/50"
                                : "border-gray-200 hover:border-emerald-500 hover:bg-emerald-50"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-10 rounded-3xl ${
                    darkMode
                      ? "bg-gray-800/70 backdrop-blur-sm shadow-xl"
                      : "bg-white/90 backdrop-blur-sm shadow-2xl"
                  }`}
                >
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">
                        {itinerary.title}
                      </h3>
                      <p
                        className={`text-lg ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {itinerary.duration} • Presupuesto: {itinerary.budget}
                      </p>
                    </div>
                    <button
                      onClick={resetItinerary}
                      className={`text-sm ${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-700"
                      } hover:underline`}
                    >
                      Modificar respuestas
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div
                      className={`p-6 rounded-2xl ${
                        darkMode ? "bg-gray-900/50" : "bg-gray-50"
                      }`}
                    >
                      <h4 className="font-semibold text-lg mb-4 flex items-center">
                        <Check
                          className={`h-5 w-5 mr-2 ${
                            darkMode ? "text-emerald-400" : "text-emerald-500"
                          }`}
                        />
                        Tu experiencia incluye:
                      </h4>
                      <ul className="space-y-3">
                        {itinerary.highlights.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full mr-3 ${
                                darkMode ? "bg-emerald-400" : "bg-emerald-500"
                              }`}
                            ></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`p-6 rounded-2xl ${
                        darkMode
                          ? "bg-gradient-to-br from-emerald-900/30 to-amber-900/30"
                          : "bg-gradient-to-br from-emerald-50 to-amber-50"
                      }`}
                    >
                      <h4 className="font-semibold text-lg mb-4">
                        Detalles del viaje
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Duración:</span>
                          <span className="font-semibold">
                            {itinerary.duration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Presupuesto:</span>
                          <span className="font-semibold">
                            {itinerary.budget}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Guía:</span>
                          <span className="font-semibold">Personalizado</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Soporte:</span>
                          <span className="font-semibold">24/7</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-emerald-500 to-amber-500 text-white py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                      Confirmar Reserva
                    </button>
                    <button
                      className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                        darkMode
                          ? "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                          : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      Personalizar más
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
              Lo que dicen nuestros viajeros
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Experiencias reales de personas que vivieron Cusco de manera
              auténtica y transformadora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 ${
                  darkMode
                    ? "bg-gray-900/50 backdrop-blur-sm border border-gray-800"
                    : "bg-white/80 backdrop-blur-sm shadow-xl border border-gray-100"
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">
                        {testimonial.name}
                      </h4>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {testimonial.country}
                      </p>
                      {testimonial.experience && (
                        <p
                          className={`text-xs mt-1 ${
                            darkMode ? "text-emerald-400" : "text-emerald-600"
                          }`}
                        >
                          {testimonial.experience}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-amber-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote
                    className={`text-lg italic ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    "{testimonial.text}"
                  </blockquote>

                  <button
                    onClick={() => toggleTestimonial(index)}
                    className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                      darkMode
                        ? "bg-gray-800/70 hover:bg-gray-700/70 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {openTestimonials[index]
                      ? "Ocultar testimonio completo"
                      : "Ver testimonio completo"}
                    {openTestimonials[index] ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </button>

                  {/* Expandable Content */}
                  {openTestimonials[index] && (
                    <div
                      className={`mt-4 p-5 rounded-2xl ${
                        darkMode ? "bg-gray-800/70" : "bg-gray-50"
                      } transition-all duration-300 animate-fadeIn`}
                    >
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {testimonial.fullTestimonial}
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className={`h-2 ${
                    index === 0
                      ? "bg-emerald-500"
                      : index === 1
                      ? "bg-amber-500"
                      : "bg-orange-500"
                  } transition-all duration-500 group-hover:h-4`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section
        id="sustainability"
        className={`py-24 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
                  Turismo con Propósito
                </span>
              </h2>
              <p
                className={`text-xl mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Creemos que el turismo debe transformar positivamente a quienes
                lo viven y a quienes lo hacen posible.
              </p>

              <div className="space-y-6">
                <div
                  className={`p-6 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800/70"
                      : "bg-white/80 backdrop-blur-sm shadow-lg"
                  }`}
                >
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <Shield
                      className={`h-6 w-6 mr-3 ${
                        darkMode ? "text-emerald-400" : "text-emerald-500"
                      }`}
                    />
                    Transparencia Total
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Todos nuestros precios son claros y detallados. Sabrás
                    exactamente qué incluye cada experiencia y cómo se
                    distribuye tu inversión.
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800/70"
                      : "bg-white/80 backdrop-blur-sm shadow-lg"
                  }`}
                >
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <Heart
                      className={`h-6 w-6 mr-3 ${
                        darkMode ? "text-rose-400" : "text-rose-500"
                      }`}
                    />
                    Impacto Comunitario
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    El 65% de cada pago va directamente a las comunidades
                    locales, artesanos, guías y proveedores que hacen posible
                    estas experiencias auténticas.
                  </p>
                </div>

                <div
                  className={`p-6 rounded-2xl ${
                    darkMode
                      ? "bg-gray-800/70"
                      : "bg-white/80 backdrop-blur-sm shadow-lg"
                  }`}
                >
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <Leaf
                      className={`h-6 w-6 mr-3 ${
                        darkMode ? "text-green-400" : "text-green-500"
                      }`}
                    />
                    Sostenibilidad
                  </h3>
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    Nuestras experiencias están diseñadas para minimizar el
                    impacto ambiental y maximizar el beneficio cultural y
                    económico para las comunidades andinas.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://placehold.co/600x400/228B22/FFFFFF?text=Comunidad+Andina"
                alt="Andean Community"
                className="rounded-3xl shadow-2xl"
              />
              <div
                className={`absolute -bottom-6 -right-6 p-6 rounded-3xl ${
                  darkMode
                    ? "bg-emerald-800/90 backdrop-blur-sm"
                    : "bg-emerald-600"
                } text-white shadow-xl backdrop-blur-sm`}
              >
                <div className="text-3xl font-bold">65%</div>
                <div className="text-sm">
                  Va directamente a comunidades locales
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {sustainabilityStats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-3xl transition-all duration-500 hover:transform hover:scale-105 ${
                  darkMode
                    ? "bg-gray-800/50 hover:bg-gray-800/70"
                    : "bg-white/80 hover:bg-white/90 backdrop-blur-sm shadow-lg"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center p-4 rounded-full mb-4 ${
                    index === 0
                      ? "bg-rose-500/20 text-rose-400"
                      : index === 1
                      ? "bg-green-500/20 text-green-400"
                      : index === 2
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section
        id="blog"
        className={`py-24 ${darkMode ? "bg-gray-950" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">
                Conocimiento Andino
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Todo lo que necesitas saber para disfrutar al máximo de Cusco y
              los Andes, desde una perspectiva auténtica y respetuosa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className={`group rounded-3xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 ${
                  darkMode
                    ? "bg-gray-900/50 backdrop-blur-sm border border-gray-800"
                    : "bg-white/80 backdrop-blur-sm shadow-xl border border-gray-100"
                }`}
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      darkMode
                        ? "bg-black/50 text-white"
                        : "bg-white/80 text-gray-800"
                    }`}
                  >
                    {post.readTime}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <p
                    className={`text-lg mb-6 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  <button
                    onClick={() => toggleBlogPost(post.id)}
                    className={`text-lg font-medium flex items-center ${
                      darkMode
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-emerald-600 hover:text-emerald-700"
                    } group-hover:translate-x-2 transition-transform`}
                  >
                    {openBlog[post.id]
                      ? "Ocultar contenido"
                      : "Leer más completo"}
                    {openBlog[post.id] ? (
                      <ChevronUp className="h-5 w-5 ml-2" />
                    ) : (
                      <ChevronDown className="h-5 w-5 ml-2" />
                    )}
                  </button>

                  {/* Expandable Content */}
                  {openBlog[post.id] && (
                    <div
                      className={`mt-6 p-6 rounded-2xl ${
                        darkMode ? "bg-gray-800/70" : "bg-gray-50"
                      } transition-all duration-300 animate-fadeIn`}
                    >
                      <p
                        className={darkMode ? "text-gray-300" : "text-gray-600"}
                      >
                        {post.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-16 ${
          darkMode ? "bg-gray-950" : "bg-gray-900"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-xl bg-emerald-900/50 mr-3">
                  <Mountain className="h-8 w-8 text-emerald-400" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
                  AndeanPath
                </span>
              </div>
              <p className="text-gray-300 mb-6">
                Creando experiencias auténticas en Cusco y los Andes desde 2015,
                conectando viajeros con la esencia de los Andes.
              </p>
              <div className="flex space-x-4">
                <button className="p-3 bg-gray-800 rounded-xl hover:bg-emerald-600 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="p-3 bg-gray-800 rounded-xl hover:bg-emerald-600 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.163c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </button>
                <button className="p-3 bg-gray-800 rounded-xl hover:bg-emerald-600 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Experiencias</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Vivencia Andina{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Lares Premium{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Pachamama Ritual{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Machu Picchu VIP{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Soporte</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Preguntas Frecuentes{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Política de Sostenibilidad{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Términos y Condiciones{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    Contacto{" "}
                    <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mt-1 mr-3 text-emerald-400" />
                  <div>
                    <p className="font-semibold">Cusco, Perú</p>
                    <p className="text-gray-400 text-sm">
                      Centro Histórico, Calle San Agustín 123
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-3 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@andeanpath.com</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-3 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+51 999 888 777</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 AndeanPath. Todos los derechos reservados. Diseñado
              con amor por los Andes.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 hover:bg-green-600 transition-all duration-300 z-50 animate-bounce"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-96 h-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-300 rounded-full mr-2 animate-pulse"></div>
              <span className="font-semibold">Chat con Soporte</span>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl max-w-xs shadow-sm">
                <p className="text-sm">
                  ¡Hola! ¿En qué puedo ayudarte con tu viaje a Cusco?
                </p>
                <p className="text-xs text-gray-500 mt-1">10:30</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl max-w-xs ml-auto shadow-sm">
                <p className="text-sm">
                  Hola, quisiera información sobre el trekking Lares
                </p>
                <p className="text-xs text-gray-500 mt-1">10:31</p>
              </div>
              <div className="bg-white p-4 rounded-xl max-w-xs shadow-sm">
                <p className="text-sm">
                  ¡Claro! Tenemos una versión premium con glamping y comidas
                  gourmet. ¿Te interesa?
                </p>
                <p className="text-xs text-gray-500 mt-1">10:32</p>
              </div>
            </div>
          </div>
          <div className="p-3 border-t bg-white">
            <div className="flex">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-500 text-white p-3 rounded-r-xl hover:bg-green-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
