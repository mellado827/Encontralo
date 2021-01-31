import React from 'react'
import { withRouter, Link } from 'react-router-dom'


const Tips = () => (
    <>
        <div className="tips heightshared d-flex flex-column align-items-center" id="tips">

            <h1 className="title_fontstyle text-center p-5">Tips</h1>

            <div className="tipsexample">
                <p className="text_fontstyle text-center"><strong>*</strong> ¿Qué debo hacer para evitar que se escapen?</p>
                <p className="text_fontstyle text-center"><strong>*</strong> ¿Estimulación mental? </p>
                <p className="text_fontstyle text-center"><strong>*</strong> ¿Cómo los cuido cuando hay fuegos artificiales?</p>
            </div>
            <div className="d-flex m-5">
                <a href="/" data-toggle="modal" data-target=".bd-example-modal-lg-dog_tips">
                    <img className="size_pettips catdogeffect" src="./img/dog_tips.png" title="Cuidados para perros" alt="dog_tips" />
                </a>
                <div className="modal fade bd-example-modal-lg-dog_tips" role="dialog"
                    aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="logoANDclose">
                                <a href="/" data-dismiss="modal">
                                    <img src="./img/close.png" className="close_button" alt="close button" />
                                </a>
                            </div>
                            <h1 className="subtitle_fontstyle text-center">
                                <strong>
                                    Tips
              </strong>
                            </h1>
                            <h2 className="text_fontstyle mt-2 bold text-center">*<u>¿Qué debo hacer para evitar que se escapen?</u></h2>
                            <h2 className="text_fontstyle mt-3 ml-3">- <u>Evitar zonas conflictivas</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">Si por la zona hay una perra en celo o sabés
                            que tu perro se pone especialmente alterado al pasar por cierto lugar, evitalo.

                            No cuesta nada cambiar un poco la ruta y
                            evitarle al perro ciertas distracciones que puedan hacerlo escapar, especialmente si está en fase
                            de
              entrenamiento.</p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Responder a la llamada</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">Si el perro va suelto durante el paseo
              <i>debemos acostumbrarlo a que no se aleje demasiado</i>. Por eso <i>es importante que acuda a la
                llamada</i>. Debemos llamarlo atrayendo la mirada del animal y hablándoles alto y claro. En cuanto
              acuda, le daremos comida u otras recompensas.
              Debemos tener paciencia y no enfadarnos si no acude. Es un proceso lento y depende de la confianza. </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Respetar la puerta</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Si cada vez que abrís la puerta de casa y tu perro intenta salir corriendo, debés saber que es un
                                problema de educación.
            </p>
                            <p className="text_fontstyle mt-1 ml-3">Cada vez que lo vayas a sacar a pasear,
                            agarrá la correa y dirígete a la puerta.
                            El perro debe estar tranquilo en el momento
                            que le pongas la correa y posteriormente,
                            cuando abras la puerta. Si no es así dí NO y
                            cierra la puerta. Repetí el proceso todos los
              días antes de salir hasta que lo entienda.</p>

                            <h2 className="text_fontstyle mt-2 bold text-center">*<u>Consejos para cuidar a tu perro</u></h2>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Llevarlo al veterinario</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Es bueno tener un veterinario de confianza al cual poder llevarle al perro para que le hagan
                                chequeos de forma regular. Es la mejor forma de estar seguros de que nuestro perro está bien de salud.
                                En ocasiones, nos podrá aconsejar sobre algún tratamiento que necesite el animal.
            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Colocale un microchip</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Es útil ante una búsqueda. <i>Un perro con chip es más fácil de ser encontrado cuando ocurre un
                extravío o hurto.</i> Los dueños tendrán acceso al sistema (con su CI y el número de chip del perro)
              y podrán chequear en la
              información de su mascota y modificar sus datos en el sistema. Un veterinario con un lector de chips
              podrá identificar a su dueño. Esto minimiza las posibilidades de hurto. Además, se pueden evitar
              múltiples castraciones a un mismo perro.</p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Sé leal y paciente</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Asegurate de que las expectativas que tienes depositadas en tu perro son razonables y recordá siempre
              que <i>la gran mayoría de los problemas de comportamiento en perros se pueden resolver.</i>
                            </p>

                            <h2 className="text_fontstyle mt-2 bold text-center">*<u>¿Cómo cuido a mi perro cuando hay fuegos
                artificiales?</u></h2>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Mantenerlos en una sola habitación</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                <i>De esta forma es más fácil estar pendiente de ellos</i> y darles un ambiente más seguro. <i>Es
                importante sacar todos los objetos que ellos puedan tirar, romper, o que sean riesgosos.</i> Los
              perros miedosos pueden esconderse
              y hacer de todo para intentar escaparse. Por eso, este espacio debe estar 100% preparado y libre de
              posibles accidentes o rutas de escape. Si el animal se esconde debajo de la mesa, de la cama, sillas o
              en cualquier otro lugar, lo mejor es no sacarlo de ahí, y dejarlo tranquilo,
              ya que ahí se sienten más seguros.
            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Método Wellington Touch</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Para poder hacerlo, se tiene que utilizar una venda y colocarle en el pecho de tu mascota, formando un
                                “8” alrededor de su cuerpo, atando los extremos en
                                la columna. Esto ayuda a estimular su circulación y estimulará que su animal se sienta más seguro y
                                menos nervioso.
            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Hacé que se ejercite</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Es muy importante que durante los días previos a esas jornadas donde tiran fuegos
                                artificiales, tu perro pasee, juegue, corra y se canse lo
                                más posible. Esto ayudará a que duerma bien durante la noche y esté más relajado cuando comiencen los
                                ruidos.
            </p>
                        </div>
                    </div>
                </div>
                <a href="/" data-toggle="modal" data-target=".bd-example-modal-lg-cat_tips">
                    <img className="size_pettips catdogeffect" src="./img/cat_tips.png" title="Cuidados para gatos" alt="cat_tips" />
                </a>
                <div className="modal fade bd-example-modal-lg-cat_tips" role="dialog"
                    aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="logoANDclose">
                                <a href="/" data-dismiss="modal">
                                    <img src="./img/close.png" className="close_button" alt="close button" />
                                </a>
                            </div>
                            <h1 className="subtitle_fontstyle text-center">
                                <strong>
                                    Tips
              </strong>
                            </h1>
                            <h2 className="text_fontstyle mt-2 bold text-center">*<u>¿Qué debo hacer para evitar que se escapen?</u></h2>
                            <h2 className="text_fontstyle mt-3 ml-3">- <u>Estimular sus sentidos</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Se le pueden proporcionar ratones de trapo para que finjan cazarlos y así, estimular su instinto
                                predador dentro del hogar. Dedicar tiempo a jugar con el gato es muy importante para mantenerlo
                                entretenido y evitar así que busque diversión en otros lugares.

            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Aburrimiento</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Un gato solitario se aburre mucho más que dos felinos que convivan juntos.

                                El deseo de percibir cosas distintas a la monotonía diaria de unas paredes, horarios, comidas y cuidados
                                recibidos, que son un calco idéntico de un día a otro; provoca en algunos gatos una especie de "día de
                                la
                                marmota", que les impele fugarse lejos de la monotonía.

              <i>Un compañero de juegos es lo ideal para romper el agobio del gato. </i>Cambios de dieta, juguetes
              nuevos y
              un poco más de tiempo de calidad con él, también serán positivos.

            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>No se puede evitar que salga</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Definitivamente, no es posible evitar que el gato sienta deseos de salir por completo, ya que es una
                                necesidad. Por eso, lo mejor es abrirle la puerta con cierta regularidad, presta atención a sus
                                necesidades, observa cuándo
                                siente deseos de salir y déjalo marchar. Volverá.

              Hacer esto es indispensable para llevar una buena relación entre ambos. </p>

                            <h2 className="text_fontstyle mt-2 bold text-center">* <u>Consejos para cuidar al gato</u></h2>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Llevarlo al veterinario</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Es bueno tener un veterinario de confianza al cual poder llevarlo para que le hagan
                                chequeos de forma regular. Es la mejor forma de estar seguros de que nuestra mascota está bien de salud.
                                En
                                ocasiones, nos podrá aconsejar sobre algún tratamiento que necesite el animal.
            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Kit de limpieza</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Cuando el gato se hace adulto acude a su caja de arena de manera instintiva y no realiza sus necesidades
                                fuera de ella. Se trata de animales muy limpios que
                                respetan el entorno donde viven procurando una higiéne insólita.

                                Recordá que la caja de arena debe estar en un lugar apartado y de cómodo acceso para el gato. También
                                tenés que mantenerla limpia, por lo que recomendamos retirar las heces de forma diaria y cambiar la arena dos
                                veces a la semana.
            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Estimulación mental</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Existen gatos de todo tipo, algunos más independientes o más sociables, otros más juguetones o
                                tranquilos... Todos ellos deben realizar actividades físicas y
                                mentales diariamente. Eso es imprescindible para contar con un gato sano y feliz.

                                Debemos saber que los gatos no se divierten si juegan solos (o al menos por períodos prologandos de
                                tiempo),
                                por lo que será muy importante hacernos con diversos juguetes para gatos (el más recomendado es el
                                plumero) y que interactuemos con él animándole a jugar.
            </p>

                            <h2 className="text_fontstyle mt-2 bold text-center">*<u>¿Cómo cuido a mi gato cuando hay fuegos
                artificiales?</u></h2>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Mantenerlos en una sola habitación</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                <i>De esta forma es más fácil estar pendiente de ellos </i> y darles un ambiente más seguro. <i>Es
                importante sacar todos los objetos que ellos puedan tirar, romper, o que sean riesgosos. </i> Los gatos
              miedosos pueden esconderse
              y hacer de todo para intentar escaparse. Por eso, este espacio debe estar 100% preparado y libre de
              posibles accidentes o rutas de escape. Si el animal se esconde debajo de la mesa, de la cama, sillas o en
              cualquier otro lugar, lo mejor es no sacarlo de ahí, y dejarlo tranquilo,
              ya que ahí se sienten más seguros.
            </p>
                            <h2 className="text_fontstyle mt-2 ml-3">- <u>Hormonas sintéticas</u></h2>
                            <p className="text_fontstyle mt-1 ml-3">
                                Las hormonas sintéticas o feromonas felinas son una ayuda para reducir el miedo de un gato temeroso o con
                                fobia a los petardos. Este tipo de productos está a la venta en la mayoría de las clínicas veterinarias
                                y tiendas especializadas en felinos, pero conviene consultar antes con el veterinario correspondiente.

                                Las hormonas felinas dispersas en el ambiente crean olores familiares que les resultan agradables y les
                                proporcionan seguridad: permiten a los gatos identificarse entre ellos y comunicar que han pasado por ahí.
            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
)

export default Tips