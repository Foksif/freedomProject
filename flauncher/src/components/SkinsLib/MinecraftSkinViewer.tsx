import React, {useEffect, useRef} from "react";
import { SkinViewer } from "skinview3d";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

interface SkinViewerProps {
    skinURL: string;
    capeUrl?: string;
}

const MinecraftSkinViewer: React.FC<SkinViewerProps> = ({ skinURL, capeUrl }: SkinViewerProps) => {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(()  => {
        if (!viewerContainer.current || !canvasRef.current) return;

        const skinViewer = new SkinViewer({
            canvas: canvasRef.current,
            width: 250,
            height: 450,
            skin: skinURL,
            cape: capeUrl,
        });

        const camera = skinViewer.camera as THREE.PerspectiveCamera;

        camera.position.set(-2, 1, 2);
        camera.lookAt(new THREE.Vector3(-1, 1, 0));

        camera.position.set(20, 5, 45);

        const controls = new OrbitControls(camera, skinViewer.canvas);
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;

        controls.update();

        return () => {
            controls.dispose();
            skinViewer.dispose();
        };
    }, [skinURL]);

    return (
        <div ref={viewerContainer} style={{ width: "250px", height: "450px" }}>
            <canvas ref={canvasRef} width={250} height={350} />
        </div>
    );
};

export default MinecraftSkinViewer;
