
import React, { useState } from 'react';
import { NavigationControls } from './NavigationControls';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    scenes: React.ComponentType[];
}

export const SceneNavigator: React.FC<Props> = ({ scenes }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

    const nextScene = () => {
        if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex(prev => prev + 1);
        }
    };

    const prevScene = () => {
        if (currentSceneIndex > 0) {
            setCurrentSceneIndex(prev => prev - 1);
        }
    };

    const CurrentScene = scenes[currentSceneIndex];

    return (
        <>
            <div className="full-screen" style={{ overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSceneIndex}
                        initial={{ opacity: 0, scale: 0.8, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 1.2, x: -100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="full-screen"
                    >
                        <CurrentScene />
                    </motion.div>
                </AnimatePresence>
            </div>

            <NavigationControls
                onNext={nextScene}
                onPrev={prevScene}
                canNext={currentSceneIndex < scenes.length - 1}
                canPrev={currentSceneIndex > 0}
                step={currentSceneIndex}
                totalSteps={scenes.length}
            />
        </>
    );
};
