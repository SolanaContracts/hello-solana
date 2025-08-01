import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloSolana } from "../target/types/hello_solana";

describe("hello-solana", () => {
  // Set up the Anchor provider
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

  const signer = anchor.web3.Keypair.generate();
  const data_account = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.provider.connection.confirmTransaction(
      await program.provider.connection.requestAirdrop(
        signer.publicKey,
        100 * anchor.web3.LAMPORTS_PER_SOL
      ),
      "confirmed"
    );

    const tx = await program.methods
      .initialize("Hello Solana")
      .accounts({
        signer: signer.publicKey,
        dataAccount: data_account.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([signer, data_account])
      .rpc();

    console.log("Your transaction signature", tx);

    const account = await program.account.whatever.fetch(data_account.publicKey);
    console.log("Data Account", account);
  });
});
