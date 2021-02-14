import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

const Scene = ({setRender}) => {

  const sceneRef = useRef(null);

  useEffect(() => {

    let Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Composites = Matter.Composites;

    let engine = Engine.create({
      // positionIterations: 20
    });

    let render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 400,
        height: 400,
        wireframes: false
      }
    });

    let bar = Composite.create();
    let wall1 = Bodies.rectangle(200, 20, 150, 1, {isStatic: true});
    let wall2 = Bodies.rectangle(200, 380, 150, 1, {isStatic: true});
    let wall3 = Bodies.rectangle(20, 200, 1, 150, {isStatic: true});
    let wall4 = Bodies.rectangle(380, 200, 1, 150, {isStatic: true});
    let wall5 = Bodies.rectangle(73, 73, 150, 1, {isStatic: true, angle: -Math.PI / 4});
    let wall6 = Bodies.rectangle(327, 327, 150, 1, {isStatic: true, angle: -Math.PI / 4});
    let wall7 = Bodies.rectangle(327, 73, 150, 1, {isStatic: true, angle: Math.PI / 4});
    let wall8 = Bodies.rectangle(73, 327, 150, 1, {isStatic: true, angle: Math.PI / 4});
    let stick1 = Bodies.rectangle(142, 57, 75, 1, {isStatic: true, angle: Math.PI / 2.7});
    let stick2 = Bodies.rectangle(260, 345, 75, 1, {isStatic: true, angle: -Math.PI / 1.6});
    Composite.add(bar, [wall1, wall2, wall3, wall4 ,wall5, wall6, wall7, wall8, stick1, stick2]);

    let balls = Composites.stack(100, 50, 5, 2, 0, 0, (x, y) => Bodies.circle(x, y, 25, {restitution: 0.3, density: 0.005, label: 'lose'}));
    let winBalls = Composites.stack(100, 100, 5, 2, 0, 0, (x, y) => Bodies.circle(x, y, 25, {restitution: 0.3, density: 0.005, label: 'win'}));
    Composite.move(winBalls, Composite.allBodies(winBalls), balls);
    Matter.Common.shuffle(balls.bodies);
    console.log(balls.bodies);

    World.add(engine.world, [bar, balls]);

    Engine.run(engine);

    Render.run(render);

    setRender(render);

  }, []);

    return <div ref={sceneRef}></div>;
}
export default Scene;
