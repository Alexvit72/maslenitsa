import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import ball from '../img/ball.svg';
import back from '../img/back.svg';

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
        background: 'none',
        wireframes: false
      }
    });

    let bar = Composite.create();
    let wall1 = Bodies.rectangle(200, 20, 155, 5, {isStatic: true, render: {fillStyle: '#5BC1FF'}});
    let wall2 = Bodies.rectangle(229, 380, 93, 5, {isStatic: true, render: {fillStyle: '#5BC1FF'}});
    let wall3 = Bodies.rectangle(20, 200, 5, 155, {isStatic: true, render: {fillStyle: '#5BC1FF'}});
    let wall4 = Bodies.rectangle(380, 200, 5, 155, {isStatic: true, render: {fillStyle: '#5BC1FF'}});
    let wall5 = Bodies.rectangle(72.5, 72.5, 152, 5, {isStatic: true, angle: -Math.PI / 4, render: {fillStyle: '#5BC1FF'}});
    let wall6 = Bodies.rectangle(327.5, 327.5, 152, 5, {isStatic: true, angle: -Math.PI / 4, render: {fillStyle: '#5BC1FF'}});
    let wall7 = Bodies.rectangle(327.5, 72.5, 152, 5, {isStatic: true, angle: Math.PI / 4, render: {fillStyle: '#5BC1FF'}});
    let wall8 = Bodies.rectangle(72.5, 327.5, 152, 5, {isStatic: true, angle: Math.PI / 4, render: {fillStyle: '#5BC1FF'}});

    Composite.add(bar, [wall1, wall2, wall3, wall4 ,wall5, wall6, wall7, wall8]);
    Composite.scale(bar, 0.7, 0.7, {x: 200, y: 200});

    let outputBody1 = Bodies.rectangle(133, 387.5, 5, 20, {isStatic: true,  render: {fillStyle: '#5BC1FF'}});
    let outputBody2 = Bodies.rectangle(182, 387.5, 5, 20, {isStatic: true,  render: {fillStyle: '#5BC1FF'}});
    let outputBody3 = Bodies.rectangle(157.5, 380, 44, 5, {isStatic: true,  render: {fillStyle: '#5BC1FF'}});
    let outputBody4 = Bodies.rectangle(157.5, 395, 44, 5, {isStatic: true,  render: {fillStyle: '#5BC1FF'}});
    let outputBody5 = Bodies.rectangle(126.5, 380, 8, 5, {isStatic: true,  render: {fillStyle: '#5BC1FF'}});
    let output = Composite.create();
    Composite.add(output, [outputBody1, outputBody2, outputBody3, outputBody4, outputBody5]);
    Composite.scale(output, 0.7, 0.7, {x: 200, y: 200});
    console.log(output);

    let balls = Composites.stack(100, 100, 5, 4, 0, 0, (x, y) => Bodies.circle(x, y, 15, {render: {sprite: {texture: ball}}}));

    let ground = Bodies.rectangle(200, 400, 400, 1, {isStatic: true,  render: {visible: false}});

    World.add(engine.world, [bar, balls, output, ground]);

    Engine.run(engine);

    Render.run(render);

    setRender(render);

  }, []);

    return <div ref={sceneRef}></div>;
}
export default Scene;
