import type { SacredCode, Rune } from './types';

export const SACRED_CODES: SacredCode[] = [
  // Prosperidad
  { "code": 520, "name": "Éxito Inesperado", "description": "Atrae el éxito y la prosperidad de fuentes inesperadas.", "category": "Prosperidad" },
  { "code": 71269, "name": "Abundancia", "description": "Para atraer la abundancia y la riqueza a tu vida.", "category": "Prosperidad" },
  { "code": 19, "name": "Atraer Clientes", "description": "Para negocios y emprendimientos, ayuda a atraer más clientes.", "category": "Prosperidad" },
  { "code": 1122, "name": "Fluidez del Dinero", "description": "Elimina bloqueos y permite que el dinero fluya con facilidad.", "category": "Prosperidad" },
  { "code": 42170, "name": "Solución a Problemas Económicos", "description": "Para encontrar soluciones rápidas y efectivas a problemas de dinero.", "category": "Prosperidad" },
  { "code": 897, "name": "Cancelar Deudas", "description": "Ayuda a manifestar los medios para liquidar deudas pendientes.", "category": "Prosperidad" },
  
  // Salud
  { "code": 8, "name": "Sanación General", "description": "Código general para la sanación de cualquier dolencia física o emocional.", "category": "Salud" },
  { "code": 608, "name": "Solucionar Problemas de Salud", "description": "Ayuda a encontrar la raíz y la solución a problemas de salud.", "category": "Salud" },
  { "code": 29, "name": "Restablecer la Salud", "description": "Para la recuperación y el restablecimiento completo de la salud.", "category": "Salud" },
  { "code": 897, "name": "Disolver la Ansiedad", "description": "Calma la mente y el espíritu, aliviando la ansiedad y el estrés.", "category": "Salud" },
  { "code": 555, "name": "Acelerar la Sanación", "description": "Potencia y acelera cualquier proceso de sanación en curso.", "category": "Salud" },
  { "code": 911, "name": "Aliviar Dolor de Cabeza", "description": "Para aliviar migrañas y dolores de cabeza tensionales.", "category": "Salud" },
  { "code": 52511, "name": "Fortalecer Sistema Inmune", "description": "Eleva las defensas del cuerpo para prevenir enfermedades.", "category": "Salud" },

  // Amor
  { "code": 2526, "name": "Atraer el Amor", "description": "Para atraer a un compañero/a de vida o fortalecer una relación existente.", "category": "Amor" },
  { "code": 571, "name": "Facilitar Conexión con Alma Gemela", "description": "Ayuda a alinear las energías para encontrar a tu alma gemela.", "category": "Amor" },
  { "code": 541, "name": "Fortalecer Amor Propio", "description": "Aumenta la autoestima, la confianza y el amor por uno mismo.", "category": "Amor" },
  { "code": 739, "name": "Sanar Relaciones Familiares", "description": "Para resolver conflictos y promover la armonía en la familia.", "category": "Amor" },
  { "code": 35133, "name": "Amor Universal", "description": "Para conectar con la energía del amor incondicional y la compasión.", "category": "Amor" },

  // Desarrollo Espiritual
  { "code": 3333, "name": "Gratitud", "description": "Potencia el sentimiento de gratitud, abriendo puertas a más bendiciones.", "category": "Desarrollo Espiritual" },
  { "code": 691, "name": "Abrir Caminos", "description": "Despeja obstáculos y abre nuevas oportunidades en todos los ámbitos.", "category": "Desarrollo Espiritual" },
  { "code": 2, "name": "Conexión con la Madre Tierra", "description": "Para enraizar y conectar con la energía sanadora de la Tierra.", "category": "Desarrollo Espiritual" },
  { "code": 1111, "name": "Apertura de Portales", "description": "Sincroniza con nuevas energías y oportunidades de crecimiento espiritual.", "category": "Desarrollo Espiritual" },
  { "code": 2190, "name": "Desarrollar Intuición", "description": "Abre y afina el canal intuitivo para recibir guía divina.", "category": "Desarrollo Espiritual" },

  // Protección
  { "code": 8888, "name": "Protección Divina", "description": "Invoca la protección de los seres de luz contra cualquier negatividad.", "category": "Protección" },
  { "code": 729, "name": "Limpieza Energética", "description": "Limpia espacios, personas y objetos de energías negativas.", "category": "Protección" },
  { "code": 70, "name": "Arcángel Miguel", "description": "Para invocar la protección y la fuerza del Arcángel Miguel.", "category": "Protección" },
  { "code": 777, "name": "Ángeles de la Guarda", "description": "Para una comunicación más clara y directa con tus ángeles guardianes.", "category": "Protección" },
  { "code": 444, "name": "Protección contra Envidias", "description": "Crea un escudo energético contra la envidia y el mal de ojo.", "category": "Protección" },
];

export const AGESTA_CODES: SacredCode[] = [
  // Salud y Bienestar
  { "code": 900, "name": "Superar Adicciones", "description": "Para liberarse de dependencias y hábitos nocivos.", "category": "Salud y Bienestar" },
  { "code": 128, "name": "Bajar de Peso", "description": "Ayuda a equilibrar el metabolismo y a alcanzar un peso saludable.", "category": "Salud y Bienestar" },
  { "code": 3, "name": "Sanar el Corazón (Físico)", "description": "Para problemas cardíacos y fortalecimiento del sistema circulatorio.", "category": "Salud y Bienestar" },
  { "code": 511, "name": "Conciliar el Sueño", "description": "Promueve un descanso profundo y reparador, combate el insomnio.", "category": "Salud y Bienestar" },
  { "code": 1, "name": "Paz Interior", "description": "Para calmar la mente y encontrar un estado de serenidad y paz.", "category": "Salud y Bienestar" },

  // Relaciones
  { "code": 888, "name": "Armonía en la Pareja", "description": "Fomenta el entendimiento, la comunicación y el amor en la relación.", "category": "Relaciones" },
  { "code": 7070, "name": "Atraer Amigos", "description": "Para abrirse a nuevas amistades sinceras y duraderas.", "category": "Relaciones" },
  { "code": 82, "name": "Resolver Conflictos", "description": "Ayuda a encontrar soluciones pacíficas y justas en disputas.", "category": "Relaciones" },
  { "code": 105, "name": "Sanar Árbol Genealógico", "description": "Libera patrones y cargas ancestrales para sanar el linaje.", "category": "Relaciones" },
  
  // Trabajo y Dinero
  { "code": 71588, "name": "Conseguir Empleo", "description": "Atrae oportunidades laborales y éxito en entrevistas de trabajo.", "category": "Trabajo y Dinero" },
  { "code": 5701, "name": "Éxito en el Trabajo", "description": "Para el reconocimiento, promoción y éxito en la carrera profesional.", "category": "Trabajo y Dinero" },
  { "code": 691, "name": "Abrir Caminos Laborales", "description": "Desbloquea oportunidades y abre puertas a nuevos proyectos.", "category": "Trabajo y Dinero" },
  { "code": 47620, "name": "Recibir Dinero Urgente", "description": "Para situaciones de emergencia donde se necesita dinero rápidamente.", "category": "Trabajo y Dinero" },
  
  // Situaciones Generales
  { "code": 525, "name": "Aprobar Exámenes", "description": "Ayuda a la concentración, memoria y a tener éxito en pruebas y estudios.", "category": "Situaciones Generales" },
  { "code": 1818, "name": "Vender una Propiedad", "description": "Facilita y acelera la venta de una casa, terreno u otra propiedad.", "category": "Situaciones Generales" },
  { "code": 1021, "name": "Protección para Viajes", "description": "Asegura un viaje seguro y libre de contratiempos.", "category": "Situaciones Generales" },
  { "code": 780, "name": "Recuperar Objetos Perdidos", "description": "Ayuda a encontrar cosas que se han extraviado.", "category": "Situaciones Generales" },

  // Ángeles y Seres de Luz
  { "code": 333, "name": "Arcángel Gabriel", "description": "Para la comunicación, la creatividad y la guía en nuevos comienzos.", "category": "Ángeles y Seres de Luz" },
  { "code": 725, "name": "Arcángel Rafael", "description": "Invoca la energía sanadora del Arcángel Rafael para cuerpo y alma.", "category": "Ángeles y Seres de Luz" },
  { "code": 881, "name": "Maestro Saint Germain", "description": "Para la transmutación, el perdón y la liberación (Llama Violeta).", "category": "Ángeles y Seres de Luz" },
];

export const RUNES: Rune[] = [
    // Prosperidad y Material
    { "name": "Fehu", "description": "Riqueza, abundancia, prosperidad material y financiera. Nuevos comienzos.", "category": "Prosperidad y Material" },
    { "name": "Jera", "description": "Cosecha, ciclos, recompensa por el esfuerzo. Resultados y paciencia.", "category": "Prosperidad y Material" },
    { "name": "Othala", "description": "Herencia, hogar, legado y pertenencia. Raíces y patrimonio.", "category": "Prosperidad y Material" },

    // Fuerza y Poder
    { "name": "Uruz", "description": "Fuerza vital, salud, coraje y energía física. Potencia y resistencia.", "category": "Fuerza y Poder" },
    { "name": "Thurisaz", "description": "Fuerza reactiva, defensa, conflicto. Romper barreras.", "category": "Fuerza y Poder" },
    { "name": "Sowilo", "description": "El Sol, éxito, vitalidad y poder. Claridad y victoria.", "category": "Fuerza y Poder" },

    // Comunicación y Sabiduría
    { "name": "Ansuz", "description": "Comunicación, inspiración divina, sabiduría y verdad. Mensajes.", "category": "Comunicación y Sabiduría" },
    { "name": "Kenaz", "description": "Conocimiento, iluminación, creatividad y revelación. La antorcha interior.", "category": "Comunicación y Sabiduría" },
    { "name": "Mannaz", "description": "La humanidad, la conciencia, la inteligencia y la cooperación social.", "category": "Comunicación y Sabiduría" },

    // Viaje y Destino
    { "name": "Raido", "description": "Viaje, movimiento, evolución y decisiones correctas. El camino de la vida.", "category": "Viaje y Destino" },
    { "name": "Ehwaz", "description": "Movimiento, progreso, confianza y alianzas. El caballo y su jinete.", "category": "Viaje y Destino" },
    { "name": "Nauthiz", "description": "Necesidad, restricción, superación de la adversidad. La fuerza de la voluntad.", "category": "Viaje y Destino" },

    // Protección y Defensa
    { "name": "Algiz", "description": "Protección divina, defensa, conexión con planos superiores. Escudo.", "category": "Protección y Defensa" },
    { "name": "Isa", "description": "Hielo, estancamiento, pausa, introspección. Detención y conservación.", "category": "Protección y Defensa" },
    { "name": "Tiwaz", "description": "Honor, justicia, liderazgo y sacrificio por una causa justa. La flecha del guerrero.", "category": "Protección y Defensa" },
];


export const SACRED_CATEGORIES = [...new Set(SACRED_CODES.map(code => code.category))];
export const AGESTA_CATEGORIES = [...new Set(AGESTA_CODES.map(code => code.category))];
export const RUNE_CATEGORIES = [...new Set(RUNES.map(rune => rune.category))];
