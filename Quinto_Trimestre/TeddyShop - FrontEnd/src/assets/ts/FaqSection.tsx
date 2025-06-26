import React, { useState } from 'react';
import { ChevronDown, CreditCard, Truck, Shield, User } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  icon: React.ReactNode;
  title: string;
  questions: FaqItem[];
}

const FaqAccordion: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-container">
      <button
        className="accordion-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="accordion-question">{item.question}</span>
        <ChevronDown
          className={`accordion-icon ${
            isOpen ? 'accordion-icon-open' : ''
          }`}
        />
      </button>
      <div
        className="accordion-content"
        style={{
          maxHeight: isOpen ? '500px' : '0',
        }}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <p className="accordion-answer">{item.answer}</p>
      </div>
    </div>
  );
};

const faqData: FaqCategory[] = [
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Métodos de Pago",
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos Nequi, Bancolombia, Daviplata, Efecty, Wester Union y pagos en efectivo contra entrega en zonas seleccionadas."
      },
      {
        question: "¿Qué métodos de pago se manejan para fuera de la ciudad?",
        answer: "Para pagos fuera de la ciudad se pedirá el pago comepleto por nuestaras cuentas bancarias y se hará envio por transportadora."
      }
    ]
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Entregas",
    questions: [
      {
        question: "¿Cuánto tiempo tarda el envío?",
        answer: "Para agendamientos en Bogotá y Soacha antes del medio día, sin adicionales o accesorios se despachará ese mismo día y llegará en el transcurso del día "
      },
      {
        question: "¿Hacen envíos fuera de la ciudad?",
        answer: "Sí, realizamos envíos fuera de Bogotá y Soacha  a ciudades seleccionadas con un tiempo estimado de entrega de 2 - 3 días hábiles, pero se debe pagar el producto por adelantado."
      }
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Seguridad",
    questions: [
      {
        question: "¿Cómo protegen mis datos personales?",
        answer: "Utilizamos protocolos de seguridad avanzados y nunca compartimos tu información con terceros sin tu consentimiento."
      },
      {
        question: "¿Tienen garantía los productos?",
        answer: "Sí, todos nuestros peluches tienen garantía de 30 días por defectos de fabricación."
      }
    ]
  },
  {
    icon: <User className="w-6 h-6" />,
    title: "Cuentas",
    questions: [
      {
        question: "¿Cómo creo una cuenta?",
        answer: "Actualmente las cuentas para ingresar al sistema son solo para nuestros vendedores."
      },
      {
        question: "¿Puedo comprar sin crear una cuenta?",
        answer: "Sí, ofrecemos la opción de compra como invitado."
      }
    ]
  }
];

const FaqSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0].title);

  return (
    <div className="faq-container">
      <div className="category-buttons">
        {faqData.map((category) => (
          <button
            key={category.title}
            onClick={() => setActiveCategory(category.title)}
            className={`category-button ${
              activeCategory === category.title
                ? 'category-button-active'
                : 'category-button-inactive'
            }`}
          >
            {category.icon}
            <span>{category.title}</span>
          </button>
        ))}
      </div>

      <div>
        {faqData
          .find((category) => category.title === activeCategory)
          ?.questions.map((item, index) => (
            <FaqAccordion key={index} item={item} />
          ))}
      </div>
    </div>
  );
};

export default FaqSection;