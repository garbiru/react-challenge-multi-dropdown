import { useState } from "react";
import dummyData from "../utils/dummy-data.js";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";

export const Dropdown = () => {
	const [states, setStates] = useState(dummyData);
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");

	const handleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const handleCheckbox = (e) => {
		const stateChecked = e.target.value;

		setStates((prev) => {
			return prev.map((state) => {
				if (state.name === stateChecked)
					return { ...state, isCheck: !state.isCheck };
				return state;
			});
		});

		e.target.value = null;
	};

	const statesChecked = states.reduce((acc, state) => {
		if (state.isCheck) return acc + 1;
		else return acc;
	}, 0);

	const filteredStates = states.filter((state) => {
		if (search === "") return state;

		return state.name
			.replace(/\s/g, "")
			.toLowerCase()
			.includes(search.replace(/\s/g, "").toLowerCase());
	});

	return (
		<div className="w-4/5 mx-auto">
			<div className="relative flex bg-white p-3 rounded-lg z-50">
				<div className="flex items-center">
					<span className="text-black">{statesChecked} selected</span>
				</div>

				<div
					className="flex flex-1 justify-end"
					onClick={handleDropdown}
				>
					<div className="w-10 h-10 flex justify-center items-center">
						<motion.div
							initial={{ rotate: 0 }}
							animate={{ rotate: isOpen ? 180 : 0 }}
							transition={{ duration: 0.5 }}
						>
							<ChevronUpIcon className="h-10 w-10 text-gray-400" />
						</motion.div>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -50, height: 0 }}
						animate={{ opacity: 1, y: -5, height: "auto" }}
						exit={{ opacity: 0, y: -50 }}
						transition={{ duration: 0.5 }}
						className="grid grid-cols-3 bg-white text-black border rounded-b-xl pb-3"
					>
						<div className="col-span-3 mb-4 p-3 pt-5">
							<input
								type="text"
								className="w-3/4 mx-12 p-2 border-gray-500 border rounded-md"
								placeholder="Search states"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						{/* TODO: Change background if is checked */}
						{filteredStates.map((n) => {
							return (
								<motion.div
									initial={{ opacity: 0, y: -50 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -50 }}
									transition={{ duration: 1 }}
									className={`flex justify-end items-center px-1 py-2 mx-3 ${
										n.isCheck
											? "bg-blue-200 border rounded"
											: ""
									}`}
									key={n.name}
								>
									<input
										className="w-4 h-4"
										id={n.name}
										type="checkbox"
										value={n.name}
										onChange={handleCheckbox}
										checked={n.isCheck}
									/>
									<label className="flex-1" htmlFor={n.name}>
										{n.name}
									</label>
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
