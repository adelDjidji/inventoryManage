import React, { createRef, useState, useEffect, useRef, useCallback } from "react";
import * as Ant from "antd";
import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import firebase from "firebase/app";

const menu = (
  <Menu className="animate__animated animate__bounce">
    <Menu.Item>
      <a target="_blank" rel="" href="/">
        Sub menu1
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="" href="/">
        Sub menu
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

// Hook
function useEventListener(eventName, handler, element = window){
    // Create a ref that stores handler
    const savedHandler = useRef();
    
    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    useEffect(() => {
      savedHandler.current = handler;
    }, [handler]);
  
    useEffect(
      () => {
        // Make sure element supports addEventListener
        // On 
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;
        
        // Create event listener that calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);
        
        // Add event listener
        element.addEventListener(eventName, eventListener);
        
        // Remove event listener on cleanup
        return () => {
          element.removeEventListener(eventName, eventListener);
        };
      },
      [eventName, element] // Re-run if eventName or element changes
    );
  };


export default function MenuNavigation(params) {
  const nav = createRef();

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // Update coordinates
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );
  
  // Add event listener using our hook
  useEventListener('mousemove', handler, nav);
 
  return (
    <Ant.Layout.Header
      ref={nav}
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div className="logo" />
      <Ant.Menu mode="horizontal" defaultSelectedKeys={["2"]}>
        <Ant.Menu.Item  key="1">
          <Ant.Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Hover me <DownOutlined />
            </a>
          </Ant.Dropdown>
        </Ant.Menu.Item>
        <Ant.Menu.Item  key="2">nav 2</Ant.Menu.Item>
        <Ant.Menu.Item  key="3" onClick={() => {
          firebase.auth().signOut();
          window.location="/"
        }}>logout</Ant.Menu.Item>
      </Ant.Menu>
    </Ant.Layout.Header>
  );
}
