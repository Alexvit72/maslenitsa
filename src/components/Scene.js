import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import ball from '../img/ball.svg';
import back from '../img/back.svg';
import './Scene.css';

const Scene = ({ setRender, className }) => {

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
        width: 300,
        height: 400,
        background: 'none',
        wireframes: false
      }
    });

    let bar = Composite.create();
    let wall1 = Bodies.rectangle(128.5, 20, 155, 5, {isStatic: true, render: {fillStyle: '#C7010F'}});
    let wall2 = Bodies.rectangle(157.5, 380, 93, 5, {isStatic: true, render: {fillStyle: '#C7010F'}});
    let wall3 = Bodies.rectangle(-51.5, 200, 5, 155, {isStatic: true, render: {fillStyle: '#C7010F'}});
    let wall4 = Bodies.rectangle(308.5, 200, 5, 155, {isStatic: true, render: {fillStyle: '#C7010F'}});
    let wall5 = Bodies.rectangle(1, 72.5, 152, 5, {isStatic: true, angle: -Math.PI / 4, render: {fillStyle: '#C7010F'}});
    let wall6 = Bodies.rectangle(256, 327.5, 152, 5, {isStatic: true, angle: -Math.PI / 4, render: {fillStyle: '#C7010F'}});
    let wall7 = Bodies.rectangle(256, 72.5, 152, 5, {isStatic: true, angle: Math.PI / 4, render: {fillStyle: '#C7010F'}});
    let wall8 = Bodies.rectangle(1, 327.5, 152, 5, {isStatic: true, angle: Math.PI / 4, render: {fillStyle: '#C7010F'}});

    Composite.add(bar, [wall1, wall2, wall3, wall4 ,wall5, wall6, wall7, wall8]);
    Composite.scale(bar, 0.7, 0.7, {x: 200, y: 200});

    let outputBody1 = Bodies.rectangle(61.5, 387.5, 5, 20, {isStatic: true,  render: {fillStyle: '#C7010F'}});
    let outputBody2 = Bodies.rectangle(110.5, 387.5, 5, 20, {isStatic: true,  render: {fillStyle: '#C7010F'}});
    let outputBody3 = Bodies.rectangle(86, 380, 44, 5, {isStatic: true,  render: {fillStyle: '#C7010F'}});
    let outputBody4 = Bodies.rectangle(86, 395, 44, 5, {isStatic: true,  render: {fillStyle: '#C7010F'}});
    let outputBody5 = Bodies.rectangle(55, 380, 8, 5, {isStatic: true,  render: {fillStyle: '#C7010F'}});
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

    return <div ref={sceneRef} className={className}></div>;
}

export default Scene;
