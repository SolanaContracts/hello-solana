use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("AQJhSNZ9KCgTdmp6d5TL8uXuZSJRuwQe1noB7Xv3gBKR");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, hello: String) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);

        let data_account: &mut Account<'_, Whatever> = &mut ctx.accounts.data_account;

        data_account.hello = hello;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        init,
        payer = signer,
        space = 200,
    )]
    pub data_account: Account<'info, Whatever>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Whatever {
    pub hello: String,
}
