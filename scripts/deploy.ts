//@ts-ignore
import { ethers } from "hardhat";
import { bosses } from "../mocks/bosses";
import { characters } from "../mocks/characters";

const main = async () => {
	const gameContractFactory = await ethers.getContractFactory("EpicGame");
	const characterNames: string[] = [];
	const characterImage: string[] = [];
	const characterHealth: number[] = [];
	const characterDamages: number[] = [];
	const characterWeapon: string[] = [];

	characters.forEach(({ name, image, health, damage, weapon }) => {
		characterNames.push(name);
		characterImage.push(image);
		characterHealth.push(health);
		characterDamages.push(damage);
		characterWeapon.push(weapon);
	});

	const { name, damage, health, image } = bosses[0];
	const gameContract = await gameContractFactory.deploy(
		characterNames,
		characterImage,
		characterWeapon,
		characterHealth,
		characterDamages,
		name, // Boss name
		image, // Boss image
		health, // Boss hp
		damage
	);

	await gameContract.deployed();
	console.log("Contract deployed to:", gameContract.address);

	console.log("Done deploying!");

	// Get the value of the NFT's URI.
	let returnedTokenUri = await gameContract.tokenURI(1);
	console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
