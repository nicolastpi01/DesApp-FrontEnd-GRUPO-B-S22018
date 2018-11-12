import { User } from './user';

export class Auction {
  id: number;
  title: string;
  description: string;
 // address: string;
  urlPics: string[];
  bidders: User[];
  currentPrice: number;
}

/*
private @Id @GeneratedValue Long id; 
	private String title;
	private String description;
	private String address;
	private HashSet<String> urlPics = new HashSet<String>();
	private int initialPrice;
	private int currentPrice;
	@Enumerated(EnumType.STRING)
	private State state = State.NUEVA; // Se puede mejorar la eficiencia de cualquier enum
	private int endingTime;
	@Temporal(TemporalType.DATE)
	private Date openingDate;
    @Temporal(TemporalType.DATE)
	private Date endingDate;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
	@JsonBackReference()
	private User owner;
	
	
	@JsonIgnore
	@ManyToMany(mappedBy = "auctionsInWhichIBid")
	private Set<User> bidders = new HashSet<User>();
*/

